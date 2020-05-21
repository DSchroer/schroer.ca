---
title: Is Deno The New Node?
date: 2020-05-20 20:14:00
tags: deno, node, nodejs, javascript, typescript, js, ts
---

Years ago I discovered a new programming language called TypeScript. I was an intern at the time working on a medium size AngularJS project. Things were not scaling well and we had trouble keeping the project stable. TypeScript really turned the project around and was my major contribution to the project. Over the years I have done a lot with TypeScript. It has been an essential tool for almost any JavaScript project. Unfortunately, I feel that TypeScript has never really had its own environment. That might all change now that [Deno](https://deno.land/) is available.

<!-- more -->

## Premise

Deno is the new runtime for JavaScript and TypeScript. It has a strong security focus and aims to fix some of the shortcomings of NodeJS. The idea is that Deno will become a web browser for scripts. It plans to take advantage of HTTP and the web ecosystem that we have already setup rather than building something new.

One of the first things that I noticed when using Deno was the security parameters. Everything that can have an effect on the outside world is disabled by default. If a Deno app wants to read a file it must be run with the `--allow-read` command. This is a huge step forward for the ecosystem. NodeJS has the dreaded `node_modules` folder. It is always filled with thousands of dependencies and can run any code on your machine. There is no way of knowing what a NodeJS application will do. I think that adding these new security flags will have two effects. First it will make Deno harder to use compared to NodeJS. The user needs to know more about what it is that they are running. However the benefit is that it can bring trust back into the ecosystem. Every year there are articles posted about the "end of NodeJS" when malware is found in NPM. Deno will help stop this fear by giving users control of their own security.

The next step forward that I instantly fell in love with was the idea of using URIs to handle dependency management. NodeJS really only has one option when installing dependencies. You can really only fetch your dependencies via NPM. This means that a there is a central authority regarding what is available to NodeJS. Deno's URI based imports take advantage of the most open thing that we have, the internet. Adding a new Deno library is as simple as hosting your own webpage. It can be put in any static site and in most cases can be done for free. For me this is the killer feature of Deno since it makes sure that Deno will be very flexible and can be used in almost any environment.

In addition to making the publishing easy, Deno also solves a long standing problem in the TypeScript on NodeJS ecosystem. There is no agreed upon format when making new packages with TypeScript. Off the top of my head you can either create a lib folder and store everything, you can compile everything locally and use `.npmignore` or you can copy all of the files including the `package.json` into a post build folder. This has always been something that bugged me about NodeJS. With Deno the problem is not just solved but it is removed. There is no need to build your TypeScript and any of it can be hosted in any package format.

Unfortunately this openness comes with a drawback. Discoverability has always been a problem in the internet. NPM is great because it lets you search for your dependencies in a single location. Deno will need something more akin to a full search engine in order to find new packages and updates. I believe that as a community this will be an important problem to solve in order to really make Deno work.

Finally there is the tooling. Deno is a single binary with no dependencies. This makes it super easy to install and distribute. On its own that is cool but what caught my eye was what you get in that single binary. Every tool that you may need for development comes built in. There are testing, formatting, packaging, profiling and installation tools available within the command line. I feel that this gives Deno great potential. If these tools work well, new projects can be built very simply. Compare this to building a TypeScript application using NodeJS. You need to setup a `package.json` and `tsconfig.json` at minimum, plus add all of the other tools that may be needed.

Now I would like to talk about the parts that still need work. Deno is a new tool and it is aiming to build a new ecosystem. This is not something that can happen in a day.

## Deno Left Pad!

Deno `left-pad` is a first step in bringing the ecosystem from NodeJS over to Deno. Now a new ecosystem can be built on top of this crucial part of any development environment.

### Usage

Using `left-pad` is even easier than ever. Just import it into your Deno application and use it as follows:

```ts
import { leftPad } from "http://schroer.ca/deno/left-pad/1.0.0/left-pad.ts";

leftPad("Deno!", 7);
// => '  Deno!'

leftPad("42", 4);
// => '  42'

leftPad("Deno!", 7, "+");
// => '++Deno!'

leftPad("Deno!", 7, 42);
// => '**Deno!'
```

### Testing

The tests are also available. Simply run the following to ensure that `left-pad` is functioning properly:

```sh
deno test http://schroer.ca/deno/left-pad/1.0.0/left-pad.test.ts
```
