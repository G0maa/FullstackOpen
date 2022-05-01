### `Part 1: (a)` - Introduction to React
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
* We are using a versoin of React that has `Hooks`, so we won't need to defien objects with methods.
* Contrary to other languages, in JavaScript the value of this is defined based on how the method is called.
* When calling the method through a reference the value of this becomes the so-called global object and the end result is often not what the software developer had originally intended.
* However, in this course we avoid these issues by using the "this-less" JavaScript.
* The ES6 class syntax is used a lot in "old" React and also in Node.js, hence an understanding of it is beneficial even in this course.
* Youtubed my way out of `Closures`, didn't really get well though.
  * They're _mostly_ functions inside funcitons.
  * JS is different because inner funcitons can access outside variables.
---
---
### `Part 1: (C)` - Component state, event handlers
* The person's age does not have to be passed as a parameter to the function, since it can directly access all props that are passed to the component.
* In JavaScript, however, defining functions within functions is a commonly-used technique.
* The idea of functions inside functions, destructuring, arrow functions, are very new to me so it will need some time to get used to.
* Making repeated calls to the render method is not the recommended way to re-render components.
* About `State Hook`:
  * The `counter` variable is assigned the initial value of state which is zero.
  * The variable `setCounter` is assigned to a function that will be used to modify the state.
  * Every time the setCounter modifies the state it causes the component to re-render.
  * Q: How does `useState()` save erm... state of a component?
  * You can debug the application by logging the values of the component's variables to the console.
* Usually defining event handlers within JSX-templates is not a good idea.
* Even handler is a function.
* ?JS is focused on functions much more than my past experiences?
* It's recommended to write React components that are small and reusable across the application and even across projects.
* > ?Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.?
---
---
### `Part 1: (D)` - A more complex state, debugging React apps
* What if our application requires a more complex state?
  * In most cases the easiest and best way to accomplish this is by using the useState function multiple times to create separate "pieces" of state.
* `...obj` (object spread), `...var` (forgot the name).
* It is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object.
* Storing all of the state in a single state object is a bad choice for this particular application...
* There are situations where it can be beneficial to store a piece of application state in a more complex data structure.
* Note: see how in [P1D - Handling Arrays](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#handling-arrays) One event handler function set both states but resulted in only one re-render, I mainly thought that when *any* `set` function is called, the component is reloaded immidietly.
* The History component renders completely different React elements depending on the state of the application. This is called conditional rendering.
* [Old React](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#old-react), tl;dr:
  * We are using `State hook` which was introduced in react 16.8.0.
  * before that there were **No** way to add state to *functional* components.
  * adding state required your componeents to be defined as classes.
* About debugging:
  * F12 - Console should always be opened along side your code.
  * When your code fails to compile => don't write more code, rather find and fix the problem immediately.
  * Old school, print-based debugging is always a good idea.
  * by using command `debugger` anywhere in the code, or by adding breakpoints in the `sources` tab.
  * Use `React developer tools`.
* Some rules of hooks:
  * `useState` and `useEffect` functions should be called from inside a function body that defines a React component.
  * Think about when does the re-render happen and what does it do.
* About event handlers:
  * Event handlers must always be a function or a reference to a function.
  * The issue in 
  ```JS
  onClick={console.log('clicked the button')}
  ``` 
  * is that our event handler is defined as a function call which means that the event handler is actually assigned the returned value from the function, which in the case of `console.log` is *undefined*.
   
  ```JS
  onClick={() => console.log('clicked the button')}
  ``` 
  * is the correct way
  * You will often see event handlers defined in a separate place.
* Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. 
* Never define components inside of other components.
* ?we use the new style of React that still a large majority of the material found online is outdated for our purposes.?


---
---
### END.
* *Time Elapsed:* `~13H00M`
