---
title: Inverse Kinematics In Game Maker
date: 2017-12-20 19:09:12
tags: Inverse Kinematics, Game Maker, GML, Script
---

Inverse kinematics is calculating the position of limbs and angle of joints in a system in order to make them reach a desired end position. In other words when considering a point calculate what angle limbs should be in to touch it. This is useful in games when making arms bend to hold objects, making legs touch the ground on uneven terrain or even rendering simple ropes.

Almost a year ago I worked on a fairly large student project with three other members. The project was to build a game using Game Maker Studio 1.4. and during this project one of the things that I ended up needing was a simple inverse kinematics script. Unfortunately I was not able to find one. This is to provide the script that I ended up using as well as an explanation as to how it works for any one interested. If you are interested in the project that I needed this for, it was a adventure/rogue lite game. It is playable on Windows or Linux and you can check it out here at [Artificial](http://artificialgame.ca/).

<!-- more --> 

In 2D, inverse kinematics can be achieved using fairly simple trigonometry so don't expect to learn any fancy new mathematical techniques. However I do hope that this script may be useful for anyone who needs it.

If you are only interested in the full script you can find it directly below. Further down is my explanation if you are interested in learning about how it works. This code is provided as is and under the MIT licence.

## Code
### Arguments:
* orig_x, orig_y (number): The coordinates of the first connected point
* target_x, target_y (number): The coordinates of the second connected point
* length1 (number): The length of the first section
* length2 (number): The length of the second section
* flip (boolean): Flip will inverse the angles. Making the joint bend in the opposite direction
* sprite1 (sprite_index): The index of the sprite to draw over section #1
* sprite2 (sprite_index): The index of the sprite to draw over section #2

### Full Script:
```js
///draw_ik(orig_x, orig_y, target_x, target_y, length1, length2, flip, sprite1, sprite2)

/*
MIT License

Copyright (c) 2017 Dominick Schroer

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software")
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

var orig_x = argument0;
var orig_y = argument1;
var target_x = argument2;
var target_y = argument3;
var length1 = argument4;
var length2 = argument5;
var flip = argument6;
var sprite1 = argument7;
var sprite2 = argument8;

var dist = point_distance(orig_x, orig_y, target_x, target_y);
var base_angle = -arctan2(target_y - orig_y, target_x - orig_x);

var cos_a = (length1 * length1) + (dist * dist) - (length2 * length2);
cos_a = cos_a / (2 * length1 * dist);
cos_a = min(1, max(-1, cos_a));
var angle = arccos(cos_a);

if(flip)
{
    angle = -angle;
}

var angle_1 = radtodeg(base_angle + angle);

var b2_x = orig_x + lengthdir_x(length1, angle_1);
var b2_y = orig_y + lengthdir_y(length1, angle_1);

var angle_2 = radtodeg(-arctan2(target_y - b2_y, target_x - b2_x));

draw_sprite_ext(sprite1, 0, orig_x, orig_y, 1, 1, angle_1, c_white, 1);
draw_sprite_ext(sprite2, 0, b2_x, b2_y, 1, 1, angle_2, c_white, 1);
```

## Explanation

Skipping the argument to variable conversions the first lines of code that we run into are:

```js
var dist = point_distance(orig_x, orig_y, target_x, target_y);
var base_angle = -arctan2(target_y - orig_y, target_x - orig_x);
```

This simple calculates the distance of the origin to the target as well as the angle between them. A 2D inverse kinematic system is essentially a triangle where three lengths are known. The length of both arms and the distance between the origin and target make up the full triangle. The base angle is needed because our final result will need to reflect the original orientation of the points.  

Now we can begin by calculating one of the interior angles. Specifically starting with the angle from the origin to the joint between both arms. Or the angle of the first sprite.

```js
var cos_a = (length1 * length1) + (dist * dist) - (length2 * length2);
cos_a = cos_a / (2 * length1 * dist);
cos_a = min(1, max(-1, cos_a));
var angle = arccos(cos_a);
```

Note that we clamp the cos_a value between -1 and 1. That is because arccos is limited to that domain and is not continuous over all real numbers. In practice doing this locks the ams to a max and min angle rather than having them break if the target is too far away for the system to reach. 

That code was an implementation of the law of cosines where Θ is the angle from the origin to the joint between both arms. 

### Law Of Cosines:
```
Θ = arccos((A^2 + B^2 - C^2) / (2 * A * B))
```

This next stage is purely for show. Flipping the angle allows the system to mirror real bones and not bend at angles that would be unrealistic. 

```js
if(flip)
{
    angle = -angle;
}
```

Now we can move on to using the angle that we calculated. Remember that our triangle is not oriented in any meaningful world space form. To calculate the actual angle in world space the code simply adds it to the base angle. Here it is also converted back to degrees since GML uses degrees.

```js
var angle_1 = radtodeg(base_angle + angle);
```

Next we can calculate the point where the new joint is by simply adding the vector representing our first arm to the origin point. This results in the point where both arms meet.

```js
var b2_x = orig_x + lengthdir_x(length1, angle_1);
var b2_y = orig_y + lengthdir_y(length1, angle_1);
```

Finally we can use the joint position and the target position to calculate the final angle. Since both of these are worldspace points there is no need to add the base angle. 

```js
var angle_2 = radtodeg(-arctan2(target_y - b2_y, target_x - b2_x));
```

Now we have all three points on the triangle and the angles between them. The final stage is to draw the sprites and they will be positioned properly.

```js
draw_sprite_ext(sprite1, 0, orig_x, orig_y, 1, 1, angle_1, c_white, 1);
draw_sprite_ext(sprite2, 0, b2_x, b2_y, 1, 1, angle_2, c_white, 1);
```