### [Functional Programming in JS](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
* Presenter has EXTREME bias towards functional programming.
* In functional programming languages functions are `"values"`.
```JS
// Not all languages allow you to do something like this.
var triple = function(x) {
    return x * 3;
}

var waffle = triple;
waffle(30);
```
* `Higher-order-functions` Functions that have other functions as arguments.
* Functions that you send into other functions are called `callback` functions.
* I hate to compare the idea of `functional programming` to `OOP` but I'd say the way they try to divide or _abstract_ functions are similar to each other.
* at th end of the day you will make one general function, and less general functions that the one general function uses, but they're not really coupled to each other.
* `reduce()` is a general higher order function for transformation, it's in the array object.
---
---
### [What the heck is the event loop anyway?](https://youtu.be/8aGhZQkoFbQ)
* Nice talk.
* So, do web APIs get busy? (i.e. calling the same web api many times, how does it deal with that?)
* If your code is slow, the `rerender` won't work, which means you can't interact with the website.
  * a way around that is using async functions, like `timeout()`... meaning you will add each slow process to an `callback queue`, therefore between each slow process, a re-render will happen.
  * This means that you will turn what's usually `Sync` (like a loop), to `Async`.
---
---
### [About web workers](https://medium.com/techtrument/multithreading-javascript-46156179cf9a)
* Similar to python builtin multiprocessing module.
  * another file, pass messages between them.
  * both operate separately.
---
---
### END.
* *Time Elapsed:* `~0H00M`