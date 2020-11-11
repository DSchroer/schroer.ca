---
title: Minecraft Server Using Docker and Terraform
date: 2020-11-11 13:52:28
tags: minecraft; docker; terraform
---

I started playing Minecraft back in 2009 just after the beta version was released. I have fond memories exploring the worlds and setting up home servers so that my brother and I could play together. Now its 2020 and we are in a global pandemic. Everyone is isolating and we have to deal with that. So my friends and I have started to play Minecraft again. I setup a simple server on Google Cloud Platform that only costs around a dollar a month for our usage. In this post I will go over the pieces that I used to build that server and how you can setup your own.

<!-- more -->

In order to follow along, you will have to have the following setup: [Docker](https://www.docker.com/), [Google Cloud Platform](https://cloud.google.com/) and [Terraform](https://www.terraform.io/). This is not a tutorial for any of those technologies. I assume that you already have some experience working them. If you would like me to write a tutorial in a future post please email me and let me know.  

## Docker

The first thing that we will need to setup is our docker image. This will contain the server and any customizations like mods and settings that you may want to use. I chose docker since its the industry standard for setting up applications for the cloud. It also lets me customize the server easily without having to worry about the cloud configuration.

First thing to do is prepare the required files:

Download the [forge server installer](http://files.minecraftforge.net/) from the project website. This will be the application that runs the server and loads our mods. It will automatically install the Minecraft server and configure it for us. 
 
Create a file called `server.properties` and fill all the properties that you want to use. A complete list of the default properties can be found on the [Minecraft Wiki](https://minecraft.gamepedia.com/Server.properties). Make sure to customize the settings to your liking.

Finally create a `Dockerfile` with the following contents:

```dockerfile
FROM openjdk:8
WORKDIR /minecraft

RUN echo eula=true > eula.txt

COPY forge-*-installer.jar .
RUN java -jar forge-*-installer.jar --installServer
RUN rm forge-*-installer.jar

COPY server.properties .
# COPY mods mods

ENTRYPOINT java -Xms4G -Xmx4G -jar forge-*.jar 
```

You should now have three files:
- forge-1.16.3-34.1.42-installer.jar
- server.properties
- Dockerfile

If you want to add mods support. Uncomment the line within the dockerfile and put all the mod jar files in a folder called `mods`. 

Build the docker image by running the following command:

```sh
docker build .
```

After building push the image to a public repository of some kind. In my case I used `us.gcr.io/personal-147022/minecraft:1` since it is part of my google cloud project.

## Terraform

Now that the image is completed, it needs to be run somewhere. For this project I chose to use Google Cloud Platform because it was cheap and I already have experience working with it. The deployment needs two things to be setup:
- A VM to run the server
- DNS + Networking to allow access

I decided that the setup should focus on cost savings and be optimized for periodic gameplay. The idea being that my friends and I only game once a week so the server should be shutoff for the rest of the time. This will keep costs very low. I decided to use [preemptible machines](https://cloud.google.com/preemptible-vms) because they are cheaper. There is a risk that the server may be shut down during the time that we are playing however it should be simple enough to restart it. 

In order to keep the setup very simple, I have written a terraform module that you can find at my [Github/GCPMinecraft](https://github.com/DSchroer/GCPMinecraft) repo. This module takes care of the setup and configuration within GCP. It will only work with Docker based image servers like the one described in this tutorial.

Create a terraform file as follows that adds GCP and the correct settings within the `gcp-minecraft` module:

```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.46.0"
    }
  }
}

provider "google" {
  credentials = file("minecraft-terraform.json") // Service account file
  project     = "personal-147022"
  region      = "northamerica-northeast1"
  zone        = "northamerica-northeast1-a"
}

module "gcp-minecraft" {
  source = "github.com/DSchroer/GCPMinecraft"

  name         = "minecraft"
  domain       = "mine.schroer.ca"
  docker_image = "us.gcr.io/personal-147022/minecraft:1"
  world_path   = "/minecraft/world"
}
```

The `gcp-minecraft` module can be customized in a few ways:
- __name__: The name of the VM to use
- __domain__: The URL that you want to setup DNS records for. 
- __docker_image__: The docker image that you built. Make sure that it is a publicly available image or else the server will not be able to download it. 
- __world_path__: The path inside the docker container that stores the world. This will be persisted and you can modify it if needed.

Running `terraform apply` on this file sets up the new VM and creates DNS configurations for us to use. 

## Networking

Finally I need to take my website `schroer.ca` and link it to the newly created cloud DNS records within Google Cloud. The reason I did this is to make sure that my friends have an easy to remember URL for the server and if I want to make changes I can do so without them being affected. Using the `mine` subdomain I setup the following DNS records that give Google Cloud control over that subdomain. 

```dns
;; NS Records
mine.schroer.ca.	1	IN	NS	ns-cloud-e4.googledomains.com.
mine.schroer.ca.	1	IN	NS	ns-cloud-e3.googledomains.com.
mine.schroer.ca.	1	IN	NS	ns-cloud-e2.googledomains.com.
mine.schroer.ca.	1	IN	NS	ns-cloud-e1.googledomains.com.
```

After this change is added it may take up to 30 minutes for the DNS records to update. Be patient. 

## Conclusion

I hope that you found this guide helpful. There is lots to explore and play around with once the basics are setup. Customize and experiment with different setups. I would like to hear about what kind of modifications you make. 