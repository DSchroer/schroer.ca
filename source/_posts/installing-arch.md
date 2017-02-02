---
title: Installing .NET core on Arch Linux
date: 2016-10-20 22:28:44
tags: arch linux dotnet
---
As both a .NET developer and a Linux enthusiast, I jumped when I learned that Microsoft was releasing the coreclr tool chain. However it turns out that using it with Arch Linux is not as simple as one would hope. I made this guide to help people setup the basic tools in order to develop using the latest .NET framework on Arch Linux.

This post is now outdated. You can just install .NET core directly from the AUR and it will work fine. I am keeping this post up in case it will help someone troubleshoot problems.
<!-- more --> 

First, as always, we have to install the necessary dependencies.

- unzip
- curl
- icu
- libunwind
- lldb
- lttng-ust
- clang35
- cmake
- git
- llvm35
- mono
- libcurl-gnutls

If you have yaourt installed then you can install them all using the following command:

<pre class="sunlight-highlight-bash">
yaourt -S unzip curl icu libunwind lldb lttng-ust clang35 cmake git llvm35 mono libcurl-gnutls
</pre>

After that we have to add libicu version 52 to the /usr/lib/ directory. Arch uses a newer version of libicu that is not compatible with .NET 5. If there is a way around this step I would love to hear about it. Unfortunately I dont know of a way at the moment. To do this without overwriting any files, you can use the following commands:

<pre class="sunlight-highlight-bash">
mkdir temp
cd temp
wget http://download.icu-project.org/files/icu4c/52.1/icu4c-52_1-RHEL6-x64.tgz
tar xvf icu4c-52_1-RHEL6-x64.tgz
cd usr/local/lib/
rm *.so
sudo cp *.52* /usr/lib/
cd ../../../..
rm -r temp
</pre>

Now we can install ASP net 5 which includes the .NET core runtimes. This should also permanently give you access to the framework’s three commands (dnvm, dnu and dnx).

<pre class="sunlight-highlight-bash">
curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh
echo "source ~/.dnx/dnvm/dnvm.sh" >> ~/.bashrc
</pre>

Now we can grab the latest version of the coreclr runtime. You can change runtime versions at any time using the dnvm command.

<pre class="sunlight-highlight-bash">
dnvm install latest -r coreclr
</pre>

That should be everything that you need in order to work with .NET core in Arch Linux. I will release more posts later about how to setup and use a full .NET development environment within Linux. Please let me know if you found this tutorial helpful or if there is anything that I should elaborate on.