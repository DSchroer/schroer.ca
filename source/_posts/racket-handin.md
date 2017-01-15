---
title: Racket Handin Protocol
date: 2017-01-14 22:46:13
tags: racket handin wxme tls
---

I will be documenting the Racket handin client protocol. By going over all of the functionality included in the protocol, I hope that it will be useful to others. The handin application is used to submit racket applications to a professor for marking. It is normally downloaded as a *.plt file that is a plugin for the DrRacket editor. This information should be useful for people who wish to port the application to other development environments than DrRacket.

The original handin client and server code can be found here:
[Handin Source](https://github.com/racket/handin)

## Disclaimer

Since this information was obtained mostly by reading the racket source and 
looking at packet captures, this protocol documentation is my best guess and by no means official. I was simply unable to find information on the protocol in any other form and have decided to provide my own documentation for others. I am providing this information under the following disclaimer:

**THE INFORMATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THERE ARE NO GUARANTEES THAT ANY OF IT IS CORRECT OR WILL REMAIN CORRECT.**

<!-- more --> 

## Testing

To setup a test handin server, there is a helpful guide that can be found here:
[Handin Quick Start Guide](https://docs.racket-lang.org/handin-server/Quick_Start_for_a_Test_Drive.html)

The certificates provided with the client are expired so you will need to generate a new set. This can be done using the following command:
```
openssl req -new -nodes -x509 -days 365 -out server-cert.pem -keyout private-key.pem
```

In order to connect to the handin server, you will need to establish a connection using the server-cert.pem file that corresponds to the server itself. This can be obtained by unpacking the .plt file that is supplied by your instructor by executing ***raco unpack handin.plt*** then locating the certificate file within. Be sure to replace handin.plt with the correct file name.

## Protocol Information

The protocol operates over a tls socket connection between the client and host. By default this connection is established over port 7979. All commands are sent through the connection as plain text and are delimited by newline characters. To make things easier to read, I will show newline characters using the escaped symbol ***\n*** in any protocol examples.

Any data sent from the server that takes the form of a list will be sent surrounded by brackets ***()*** and separated with spaces. Any string data is sent surrounded with double quotes. If more information is needed about the formatting of data, simply follow the format that would be used in the Racket language.

All documents are sent using the WXME format. This is a custom format used by the racket editors like DrRacket. It is currently undocumented, however it is possible to use racket to convert to and from this format.

# General

## Connection Handshake

Every interaction between the client and the server must begin with the handshake commands. First the client sends the application name, in this case ***handin***. The server will then respond by sending back the same name. After that the client will send its version identifier, (currently ***ver1***) the server will respond with the same information again. Like all commands they are both ended with newline characters. 

### Client:
```
handin\n
ver1\n
```

### Server:
```
handin\n
ver1\n
```

## Disconnecting

Every interaction between the client and the server should end with the client disconnecting. To disconnect a session correctly, the client must send the ***bye*** command. The connection will then be closed by the server after any final information is sent. For most cases simply closing the connection will also end the session, however this may have unintended side effects.

### Client:
```
bye\n
```

### Server:
```
ok\n
```

## Authentication

Some interactions require that the client is logged in. This is done by sending two consecutive commands. First the client sends ***set username/s "username"*** where the username field is replaced with the correct username. Second the client sends ***set password "Password123"*** where Password123 is replaced with the correct password. For any set commands, the server will not send anything in response.

### Client:
```
set username/s "username"\n
set password "Password123"\n
```

# Users

## Retrieve User Fields

The user fields are the required fields to create or modify an account. These generally include the users name, id and email. These fields are returned in the form of a list of strings. Additional fields can be defined by the server, and can be fetched by the client by sending the ***get-user-fields*** command. 

### Client:
```
get-user-fields\n
```

### Server:
```
("Full Name" "ID#" "Email")\n
```

## Retrieve User Info

Retrieving user info will return values that match the user fields retrieved by the previous command. In order to get this command to execute correctly the connection must be authenticated. It is a single command of ***retrieve-user-info*** sent to the server.

### Client:
```
retrieve-user-info\n
```

### Server:
```
("John Doe" "1234" "test@example.com")\n
```

## Submit Info Change

Submitting a information change requires that that client be authenticated. Then the following commands must be sent to the server ***set new-password "Password1234"***, ***set user-fields*** and finally ***change-user-info***. The user fields that are sent must match the user fields that are provide by the server. If the change is successful, the server will not send any response.

### Client:
```
set new-password "Password1234"\n
set user-fields ("John Smith" "12345" "test2@example.com")\n
change-user-info\n
```

## Create New User

To create a new user, the client needs to authenticate as the new user and then issue the commands ***set user-fields*** and ***create-user***. If the new user is successfully created, the server will not send any response.

### Client:
```
set user-fields ("John Smith" "12345" "test2@example.com")\n
create-user\n
```
# Assignments

## Retrieve Assignment List

The assignment list command will make the server send you all currently available assignments that can be submitted to. The server will send the assignment list in the form of a list of strings. The command to get the assignment list is ***get-active-assignments***.

### Client:
```
get-active-assignments\n
```

### Server:
```
("test")\n
```

## Retrieve Assignment

To retrieve a submitted assignment, the client must first be authenticated as the user that submitted the assignment. Then the commands ***set assignment*** and ***get-submission*** can be sent. The server will respond with the length of the document, a ***$*** to indicate the beginning of the content, and then the content of the document. The contents will be a rkt document using the WXME format.

### Client:
```
set assignment "test"\n
get-submission\n
```

### Server:
```
1234\n
$[assignment contents]\n
```

## Submit Assignment

Submitting an assignment is similar to the retrieval process. The client must be authenticated and sends the commands ***set assignment*** and ***save-submission***. The server will respond with ***ok*** if the user is allowed to submit the data. The client must then send the length in bytes of the assignment data. If the server responds with ***go*** then the client can send the data, encoded as WXME, to the server beginning with a ***$*** to mark the beginning of data. When all of the data is received, the server will send ***confirm***. If the client responds with ***check*** the assignment will be saved and the server will finally respond with **ok**.

### Client:
```
set assignment "test"\n
save-submission\n
1234\n
$[assignment contents]\n
check
```

### Server:
```
ok
go
confirm
ok
```

