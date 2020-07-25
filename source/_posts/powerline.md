---
title: Optimizing Powerline Adapter Networks
date: 2020-07-24 12:00:00
tags: powerline; dhp-700av; dhp-701av; d-link; networking
---

I don't like WiFi. I find that there are too many variables that make it difficult to maintain a reliable signal throughout a home. WiFi extenders also don't seem to solve the problem. They connect to a slower signal to re-send it further which only slows the connection down more. The best solution is obviously running an ethernet cable between every device, but that is rarely feasible if your home is not already wired for it. Recently I started using powerline adapters as a middle ground. They may be a good substitute for ethernet cables, but only if they are setup correctly.

Powerline adapters work by plugging the devices into two locations on the same electrical system. They send high frequency signals across the system that can be read back out on the other side. Just like an ethernet cable, these adapters are physically connected using the wiring that is already in your home. However there is a catch, the line is shared. This makes the adapters sensitive to interference caused by other equipment. In this article I will cover how to diagnose connection issues and how to optimize your powerline network. I am using the [D-Link DHP-701AV](https://ca.dlink.com/en/products/dhp-701av-powerline-av2-2000-gigabit-starter-kit) for my power adapters. Some of what I have learned will work on most adapters but there is some information that is specific to these devices. 

<!-- more -->

### Connecting To The Adapters

One of the things that I don't like about the powerline adapters is that they "just work". The idea of "just work" can often be a replacement for good configuration tools. The goal is to ensure that all points in my network can take full advantage of this connection and will not slow down down from the adapters. In my case I have a 50Mbps DSL internet connection. Unfortunately my adapters were only transmitting ~4Mbps even though all the connection indicators were green. After contacting D-Link support for more information on troubleshooting the connection I was told that it should "just work" and there was not much that could be done. They also claim that there is no way to connect to the device to get more information. Both of these claims are wrong.

The first thing that you need in order to improve a network is to understand where the bottlenecks are. The connection between powerline adapters are mainly affected by two things: distance and interference. Distance is not how far apart the two outlets are, in reality the distance is based on the amount of electrical cable that connects the two outlets. This means that how far apart two devices are will not be a good indicator of the connection. Regarding interference, a lot of online resources claim that large appliances such as fans and washing machines cause interference that affect powerline adapters. Contrary to those claims, in my research I found that it is much more likely that small electronics with cheap switching power supplies will cause the majority of interference. Minimizing electrical cable distance and removing noise should be the main goal of any powerline network. 

It is important to find out exactly how strong the connection is between each device. As I mentioned previously, all of the indicators on my adapters are green. The range of acceptable speeds for a green light seems to be any speed that holds a connection. Thankfully there is a tool provided by D-Link that allows a laptop to connect and configure these devices over the network. This gives a much more accurate view compared to the red and green indicator lights on the device. 

Download the D-Link [PLC Utility for Windows ](https://support.dlink.com/ProductInfo.aspx?m=DHP-701AV). This utility allows you to:
* Rename devices
* Change the powerline encryption
* Upgrade firmware
* View connection strengths

To use this software simply install it onto a laptop. Plug the laptop directly into one of the powerline adapters that is connected to the wall using an ethernet cable. Hitting refresh in the software shows all of the powerline adapters within your network. The lines connecting each adapter shows the connection speed between them. With this data the rest of the network can be accurately configured. 

### Mapping The Network

To map the network I plugged one device into the wall near my router. I took a floorplan of my apartment and labeled the location of that device "Entry". After setting up the fixed device I took the other adapter and plugged it into every outlet that I could find and recorded the connection strength between each point. Initially I assumed that the connection strength would drop linearly as I got further away from the device. This was not the case and as you can see from the diagram below, some outlets perform much better than others.

![Network Map](/images/dlink/initial-connections.png)

Now that there is a baseline, some of the connections can be improved. As seen above the connection strength seems to change randomly from plug to plug. It is important to find patterns because this will give insight into how the electrical systems are organized. With this it is possible to determine the best locations to place each adapter. In order to get better insight into these patterns, I picked the outlet that would likely generate the worst possible connection and re-ran the same tests. The results are marked on the diagram below.

![Worst Case](/images/dlink/worst-case.png)

After testing my worst case, there are some strange results. It appears that the lower right side of the house is connected by a single electrical line. This line spans both stories and makes a strong connection between the office and living room. These connected lines will likely be helpful in determining the ultimate final configuration.

Since the worst case test showed some unknown connections, the next test was my idea of the best case. It turns out that the side outlets were not on a very good connection. These outlets are less well suited to host a connection. Identifying dead zones can be just as useful as finding good connections. 

![Optimized](/images/dlink/optimized.png)

In the end my final layout ended up using the same entry point that I started with. For the outputs I chose to use the best outlets that I had discovered over my tests. Unfortunately none of the connections are as fast as I would have hoped but all of the connections are at least reliable. My goal was only to have a faster connection than my base internet speed, so all of these values are acceptable.

![Final Connections](/images/dlink/final-connections.png)

### Removing Interference

Interference from other electrical devices also has a large effect on powerline adapters. It will drastically reduce the final speed even if adapters are located on good lines. Detecting this interference is difficult however there is some information that can help:
* Switching power supplies cause the most interference
* The receiving side is most affected by interference

It is a good idea to establish a baseline by unplugging as many devices as possible and then re-connecting them one by one to identify any that may be create too much electrical noise. In this case look for things like small electronics, laptops or other devices that would have a compact power supply. On my line I discovered that my laptop along with a small electric drink warmer was causing the most interference. If you have a connection and you don't know what side has interference, run a speed test and compare upload and download speeds. If the download speed is bad but the upload speed is good then the interference is at your current end of the line. 

To remove interference you can move the device to an outlet that is further away from the powerline adapter. If this is not an option there are also powerline filters that you can purchase online such as this [Insteon Powerline Noise Filter](https://www.amazon.ca/Insteon-1626-10-Filterlinc-10-Amp-Filter/dp/B003ICY1S4/).