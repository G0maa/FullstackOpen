### `Part 1: (b)` - Introduction to React
* "probably the most important topic of this course" 😮
* "the file public/index.html doesn't contain any HTML markup that is visible to us in the browser."
* "when using React, all content that needs to be rendered is usually defined as React components."
* The layout of React components is mostly written using [JSX](https://reactjs.org/docs/introducing-jsx.html) Not HTML.
* Under the hood, JSX returned by React components is compiled into JavaScript.
* The compiling is handled by [Babel](https://babeljs.io/repl/)"
* "JSX is "XML-like", which means that every tag needs to be closed."
* "a core philosophy of React is composing applications from many specialized reusable components."
* Some tips:
  * Advance in small steps, console (F12) should be always open in the beginning.
  * You can always try `console.log()`.
  * **React components must be capitalized** (first letter)🤨
  * React component (usually) needs to contain one root element.
  * You can skip having an added `<div>` element by using fragments `<> </>`.
---
---
### `Part 1: (b)` - JavaScript
* Browsers do not yet support all of JavaScript's newest features.
* Due to this fact, a lot of code run in browsers has been transpiled from a newer version of JavaScript to an older, more compatible version.
* Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine.
* What's a "Runtime environemnt"?
* Notable in this example is the fact that the contents of the array can be modified even though it is defined as a const. Because the array is an object, the variable always points to the same object. However, the content of the array changes as new items are added to it.
* forEach has a weird syntax.
* When using React, techniques from functional programming are often used.
* One characteristic of the functional programming paradigm is the use of immutable data structures.
* In React code, it is preferable to use the method concat, which does not add the item to the array, but creates a new array in which the content of the old array and the new item are both included.
* objects in JavaScript can also have methods.
* Debugging `props`? `console.log(props)`
* 
---
---
* *Time Elapsed:* `~4H00M`.
##### END.