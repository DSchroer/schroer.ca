---
title: Chromebook Storage Upgrade
date: 2017-04-13 10:48:15
tags: chromebook sd storage hardware hack
---

I have been using my Lenovo N22 Chromebook, running linux, for a couple of months now. It is an extremely convenient laptop for travel, school, and even personal projects. I have even been able to use the recently released Vulkan graphics API, just to show how capable these little laptops are. Unfortunately, there is one small problem that has been bothering me. The N22 model, similar to almost all Chromebooks, only has 16GB of storage. 

In this post I will explore my solution to expand the devices storage capacity. 

<!-- more --> 

## First Idea

My initial idea was to simply go out and purchase a large SD card. Unfortunately my device only has a regular SD card reader. So I ended up having a large card jutting out from the side, that could fall out at any time. There was no way I would use that for a long time. 

So I began by removing the plastic casing off the card. As it turns out, modern full sized SD cards do not use the full space provided to them. So I could remove half of the space that the card took up. This still wasn't enough to fit nicely into the reader. So I moved to a more interesting approach.

## Second Idea

My second idea was to take apart the SD card. Then solder the internals of the card to the reader, having it sitting inside the laptop and acting as a permanent internal storage device. This approach worked very well, but is a little risky.

To begin you will need the following equipment:
* Screwdriver Set
* Spudger
* Soldering Iron
* Assorted Wire
* Electrical Tape
* Large SD Card

For starters, using a flat head screwdriver, pry open the plastic casing on the SD card. Dont worry about the lock switch, it doesn't do anything to most cards and we will bypass it later. In the end you should have a single solid chip with the 9 exposed pads.

![Open SD Card](/images/storage/open_sd.jpg)

Next we need to open the laptop. I have already written a post on this topic. Please follow the instructions located here: 

Once that is finished we are ready to prepare the SD card. There are 9 pads on a typical SD card, each one of them will need to be connected to the 9 pins on the laptops SD reader. Begin by soldering a wire to each pad.

![Soldered Pads](/images/storage/sd_leads.jpg)

Now we need to attach the wires to the laptop. If you look at the SD card reader you will notice that there are 11 connectors coming out. There should be 9 of them that line up correctly with a card when inserted into the reader. The other two pins are for the card detection and card lock detection circuits, we will deal with them later. For now, solder all 9 wires to the 9 corresponding connectors.

![Half Complete](/images/storage/solder_half.jpg)
![Half Complete](/images/storage/solder_full.jpg)

At this point everything required for the card to work is installed. However you will notice that the card is not detected if you boot up the computer. This is because there are still two pins that need to be dealt with. To do this, I will briefly describe how they operate.

There are two circuits that are not involved with the operation of the card. The first one detects when the SD card is present in the reader. The second one detects the position of the lock switch on the card itself. Until this project I was under the impression that the cards lock switch affected the workings of the card directly, however it just moves a switch on the reader that tells the software to write or not. Both of these circuits are activated when they are pulled down to ground. In this case the metal housing is directly connected to the ground plane, so soldering the pins directly to the case with a small wire should disable both protection mechanisms.

![Security Bypassed](/images/storage/complete.jpg)

At this point, when you turn the computer on, you should see the SD card detected and writable. Congratulations, you have permanently expanded the storage of your Chromebook. Tape up any exposed leads, put the laptop back together and enjoy. 

One final note, I noticed that my Cromebook refuses to boot out of anything but the main storage. So its a good idea to place your core OS on the original storage and to setup mount points that point to the new storage.



