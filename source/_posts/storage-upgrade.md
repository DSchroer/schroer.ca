---
title: Chromebook Storage Upgrade
date: 2017-04-13 10:48:15
tags: chromebook sd storage hardware hack
---

I have been using my Lenovo N22 Chromebook running linux for a couple of months now. It is an extremely convenient laptop for travel, school and even personal projects. I have even been able to use the recently released Vulkan graphics API, just to show how capable these little laptops are. Unfortunately there is one small problem that has been bothering me. The N22 model, similar to almost all Chromebooks, only has 16GB of storage. 

In this post I will explore my simple solution to expand the devices storage capacity. 

<!-- more --> 

## First Idea

My initial idea was to simply go out and purchase a large SD card. Unfortunately my device only has a regular SD card reader. So I ended up having a large card jutting out from the side, that could fall out at any time. There was no way that I would use that for a long time. 

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

Next we need to open the laptop. I have already written a post on this topic. Please follow the instructions located here: 

Once that is finished we are ready to install the card.

