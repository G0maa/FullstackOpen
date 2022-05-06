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
### END.
* *Time Elapsed:* `~0H00M`