---
title: Church Model Photogrammetry
date: 2018-11-19 21:07:12
tags: 3D, Photogrammetry, Agisoft
---

While I was in Germany, my father and I went out for a bit ride around the towns near Essen. One of the towns that we checked out was 
[Neviges](https://www.google.com/maps/place/Neviges,+42553+Velbert,+Germany/@51.308056,7.0787631,14z/data=!3m1!4b1!4m5!3m4!1s0x47b8d9fbe2c75ca9:0xa2760fee5bc5f30!8m2!3d51.3064772!4d7.1014088) 
and with that the Wallfahrtsdom. This is one of the most interesting churches that I have seen. It has a very imposing presence, its dark, very geometric and entirely made of concrete. 

Near this was a little model that showed what the building looked like. While examining it I had the idea to take a video and rebuild the model in 3D using photogrammetry.

<!-- more -->

Here is the reference video that I took of the little display. Its just a simple 27 second clip walking around the structure. These days it doesnt take much to be able to build 3D models from images, this video contained more information than I really need in the end.


<iframe width="560" height="315" src="https://www.youtube.com/embed/KPjO4_Dkkvg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>

My first step was to break the video up into a bunch of reference photos. By running the following ffmpeg command, I was able to split the video into frames. The -r command specifies 10 frames per second which resulted in 267 images for me to work with. 

<pre class="sunlight-highlight-bash">
ffmpeg -i VID_20181109_110907.mp4 -r 10 -f image2 image-%07d.png
</pre>

This was the most complicated part of the process finished. 
From here I opened up a copy of [Agisoft Photoscan](http://www.agisoft.com/) and set to work processing the images.

First I created a new chunk to work with. Since this is a very simple object I really have no need for more than one. Under the chunk I imported all of the photos. Since this is only a simple 3D model and there is no need for accuracy, I can jump straight into processing and see what comes out. 

So I ran the photo allignment tool. Uning the default setting and just letting it compute. The process took about 30 minutes on my computer. This calculated the position of all of the photos within the scene. It also generated a sparse cloud of tie points. These are all of the points that Agisoft found shared between the different pictures in 3D space.

From the sparse point cloud I can now compute the dense point cloud. This contains much more detail about the actual object. Once again it took around 30 minutes to complete and resulted in a cloud that is now beginning to resemble the actual object.

Here I can start to generate the actual 3D model. The results will be untextured but I am now able to get an idea for the quality of the final result. As you can see some of the sides are not as straight as the real thing but overall it has come quite close.

To finish it off I ran one final round of processing that calculated the texutre for the 3d mesh. I have to say that the difference between the textured and untextured mesh was astounding. I really didnt expect it to suddenly get so close to the original model. 

Even though 3D photogrammetry is still a ongoing topic of research, I find the technology that is available to be incredibly good. Hopefully this shed some light on how simple the process has become and maybe it will inspire some people to try it themselves. 

You can downlod the final mesh here if you would like to use it or inspect it for some reason. 

