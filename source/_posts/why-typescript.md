---
title: Why Not TypeScript
date: 2017-1-6 11:09:13
tags: TypeScript JavaScript
---

Recently I looked into TypeScript. I had been working on a project that was growing rapidly. The downside was that the project was breaking continuously. We needed a way to fix it. TypeScript seemed like a good idea but we had our reservations.

Turns out TypeScript was the perfect solution for us. It strengthened our code base and reduced the number of bugs we introduced. 
<!-- more --> 

## JavaScript Is Already TypeScript

The first concern that I had was "can we move all of our code to TypeScript?". WI think that this was fairly reasonable to ask since usually changing languages is a laborious process.

As it turns out I was concerned about nothing. TypeScript is a superset of JavaScript. This means if we make a program called ***app.js*** that contains the following JavaScript code:

```js
function test(a, b) {
    return a + b;
}
```

Then we rename ***app.js*** to ***app.ts*** making it a TypeScript file. The compiled output of the application is this:

```js
function test(a, b) {
    return a + b;
}
```

They are the same! This works with any JavaScript code too. Meaning that moving your entire application to TypeScript is as simple as renaming ***\*.js*** to ***\*.ts***. 

This is something that I did not find to be clear enough when first looking at TypeScript.

## TypeScript Disappears

One view that I have come to have regarding TypeScript is that it does not exist. I don't mean that it is not a language, I simply mean that when your code is running on your web page there are almost no signs that TypeScript was ever there. 

Lets take the toy function from before and add type information.

```ts
function test(a: number, b: number): number {
    return a + b;
}
```

Now the function test only adds two numbers together, rather than adding two of anything. When we compile it, we are given the following JavaScript code:

```js
function test(a, b) {
    return a + b;
}
```

As you can see, the TypeScript code is gone. It operates as a very powerful development time tool. Making sure that as a developer I don't use the wrong types within the codebase.

---

I guess the point that I am trying to make is that TypeScript is very easy to adopt into any JavaScript project. It simply adds tools that developers can take advantage of. Then when you get back to the browser, it disappears. It is super easy to migrate an entire project to TypeScript, so why not give it a try?

