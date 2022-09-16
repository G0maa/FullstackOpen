- Hopefully better than the last part...
- tl;dr ?TS works on source code only?

### `Part 9: (a)` Background and introduction

- TypeScript is a programming language designed for large-scale JavaScript development created by Microsoft.
  - better development-time tooling
  - static code analysis
  - compile-time type checking
  - code level documentation
- TypeScript is a typed superset of JavaScript, and eventually it's compiled into plain JavaScript code.
- Everything related to the types is removed at compile-time, so TypeScript isn't actually genuine statically-typed code.

### `Part 9: (b)` First steps with TypeScript

- we will focus in this part on the most common issues that arise when developing express backends or React frontends with TypeScript. In addition to language features, we will also have a strong emphasis on tooling.
- From TS to JS, these stuff are removed:
  - type annotations
  - interfaces
  - type aliases
  - other type system constructs
- In a production environment, the need for compilation often means that you have to set up a "build step." During the build step all TypeScript code is compiled into JavaScript in a separate folder, and the production environment then runs the code from that folder.
- In a development environment, it is often handier to make use of real-time compilation and auto-reloading in order to be able to see the resulting changes more quickly.
- tl;dr:
  - Always question if a function should actually return the type you created i.e. shouldn't you `throw error` instead? e.g. dividing by zero.
  - Eventually we ended up coding cases when the input is of another type, and `throw error`.
- The `unknown` is a kind of top type that was introduced in TypeScript version 3 to be the type-safe counterpart of `any`.
  - Anything is assignable to `unknown`, but `unknown` isn’t assignable to anything but itself and `any` without a type assertion or a control flow-based narrowing.
- Since the typings are only used before compilation, the typings are not needed in the production build and they should always be in the devDependencies of the package.json.
- TypeScript's Interface object type keyword, which is one way to define the "shape" an object should have.
- A good rule of thumb is to try importing a module using the import statement first. We will always use this method in the frontend. If import does not work, try a combined method: `import ... = require('...')`.
- In TypeScript, every untyped variable whose type cannot be inferred implicitly becomes type `any`.
  - Implicit `any` typings are usually considered problematic, since it is quite often due to the coder forgetting to assign types (or being too lazy to do it), and it also means that the full power of TypeScript is not properly exploited.
  - This is why the configuration rule `noImplicitAny` exists on compiler level, and it is highly recommended to keep it on at all times. In the rare occasions when you truly cannot know what the type of a variable is, you should explicitly state that in the code.
- What if we would like to prevent developers from using `any` type at all?
  - Compiler won't show errors if it's an explicit `any`, which might be the case in many libraries.
  - Solution: Use eslint. `npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`

### `Part 9: (C)` Typing the express app

- One major change from the previous part is that we're not going to use ts-node anymore.
  - It is a handy tool that helps you get started, but in the long run it is advisable to use the official TypeScript compiler that comes with the typescript npm-package.
  - The official compiler generates and packages JavaScript files from the `.ts` files so that the built production version won't contain any TypeScript code anymore.
  - This is the exact outcome we are aiming for, since `TypeScript` itself is not executable by browsers or `Node`.
- The bare tsc command is often added to the scripts so that other scripts can use it, hence don't be surprised to find it set up within the project like this.
- tsconfig.json
  - `module` tells the compiler that we want to use CommonJS modules in the **compiled code**.
- It is quite a common practice to separate the "business logic" from the router code into its own modules, which are quite often called services.
- We can fix the problem by doing a `type assertion`. This should be done only if we are certain we know what we are doing. If we assert the type of the variable `diaryData` to be `DiaryEntry` with the keyword `as`, everything should work.
  - We should never use `type assertion` unless there is no other way to proceed, as there is always the danger we assert an unfit type to an object and cause a nasty runtime error.
  - In our case we made the `.json` file a `.ts` file and basically hardcoded stuff.
- About `Node and JSON modules` after enabling `resolveJsonModule`:
  - Node tries to resolve these extensions in order:
    - `[js - json - node]`
  - After using TS: (You can disallow `js` and `json` depending on `tsconfig`)
    - `[js - json - node - ts - tsx]`
  - so when you `import myModule from "./myModule";`, and have `myModule.json` and `myModule.ts` in the same directory.... :)
- The `Pick` utility type allows us to choose which fields of an existing type we want to use. `Pick` can be used to either construct a completely new type, or to inform a function what it should return on runtime.
  - and the **compiler** would expect the function to return an array of values of the modified `DiaryEntry` type, which include only the four selected fields.
  - There's also `omit` utility type.
- We would like to have assurance that the object in a post request is the correct type,
  - here are plenty of things that can go wrong when we accept data from outside sources. Applications rarely work completely on their own, and we are forced to live with the fact that data from sources outside of our system cannot be fully trusted.
- `unknown` is the ideal type for our kind of situation of input validation, since we don't yet need to define the type to match any type, but can first verify the type and then confirm the expected type.
  - However, we might still need to use any in some cases where we are not yet sure about the type and need to access properties of an any object in order to validate or type check the property values themselves.
- Instead of a type alias we should use the TypeScript `enum`, which allows us to use the actual values in our code at runtime, not only in the compilation phase.

### `Part 9: (D)` React with types

- TS of `Create-React-App`
  - `npx create-react-app my-app --template typescript`
- The compilerOptions now has the key `lib` that includes "type definitions for things found in browser environments (like document)."
- we need to get our linting script to parse \*.tsx files, which are the TypeScript equivalent of React's JSX files. We can do that by altering our lint command in .package.json to the following: `eslint './src/**/*.{ts,tsx}'`
- With TypeScript, we don't need the `prop-types` package anymore.
- About objects with unexpected parameters:
  - Can't define one `interface`.
  - Either union of `interfaces`
  - or sometype of inheritance => one `base interface`, and many `unique interfaces` using the keyword `extends`.
  - You'd need to know the instance you have applies to which `unique interface`, in which case you use `switch...case` and verify in each case with some unique parameter that this `base interface` is actually that `unique interface`.
  - If needed, at the `default case`, you can throw error i.e. this given `interface` doesn't apply to any `unique interfaces`, the function parameter would be of type `never`.
  - There was a name for this design pattern, which I forgot.
- In most cases you can use either type or interface, whichever syntax you prefer. However, there are a few things to keep in mind.
- When diving into an existing codebase for the first time, it is good to get an overall view of the conventions and structure of the project. You can start your research by reading the README.md in the root of the repository. Usually, the README contains a brief description of the application and the requirements for using it, as well as how to start it for development.
  - You can also browse the folder structure to get some insight into the application's functionality and/or the architecture used. These are not always clear, and the developers might have chosen a way to organize code that is not familiar to you.
- `Omit` with unions have unexpected behaviour.
- Formik is a small library that helps you with the 3 most annoying parts:
  - Getting values in and out of form state
  - Validation and error messages
  - Handling form submission
  - The Formik component is a wrapper, which requires two props: initialValues and onSubmit. The role of the props is quite self-explanatory. The Formik wrapper keeps a track of your form's state, and then exposes it and a few reusable methods and event handlers to your form via props.

---

- IMPORTANT: How to validate fields efficeintly in TS?
- Passing a type parameter to Axios will not validate any data. It is quite dangerous especially if you are using external APIs. You can create custom validation functions which take in the whole payload and return the correct type, or you can use a type guard. Both are valid options. There are also many libraries that provide validation through a different kind of schemas, for example `io-ts`.
- Generally `find()` or similar opretaions could lead to `undefined` which might be needed to handle separately.
- [About React's native state management](https://medium.com/@seantheurgel/react-hooks-as-state-management-usecontext-useeffect-usereducer-a75472a862fe)
- You will most likely read far more code than you are going to produce throughout your life.
- About validating input:
  - You have `req.body` which is an object of type `any`.
  - You move it to some type of `parser`,
  - `parser` checks every needed field of `body`, eventually matches to some object of some sepcific type I need.
  - and checks if that field is of the needed type e.g. string.
  - Something about `type guards`.
- `req.body` is of type any, which is weird, like you are reading `json` you don't have many types to parse?
- Utility types include many handy tools, and it is definitely worth it to take some time to study the [documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html).
- How to deal with actual `any`?
  - Ignore warnings, e.g. `express.body`.
  - Use `as`, if we are 101% sure that they're of that representation (e.g. JSON files)
  - Actually define interfaces :), one for `input`, one for `parsedInput`, and a function for `parser()`.
- TypeScript only checks whether we have all of the required fields or not.
- As you can see, there is a lot of stuff to go through before beginning the actual coding. When you are working with a real project, careful preparations support your development process. Take the time needed to create a good setup for yourself and your team, so that everything runs smoothly in the long run.
- Arguments before `--` are interpreted as being for the npm command, while the ones after that are meant for the command that is run through the script (i.e. tsc in this case).
  - ` npm run tsc -- --init`
- In the excercises I made the validations _inside_ the modules, unlike course material which were in the routes themselves.
- I am not sure about the production workflow of TS.
  - Two steps Building then compiling.
  - Use of different modules (to do ^)
- About [TS Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- There's a lot about [`tsconfig`](https://www.staging-typescript.org/tsconfig#strict).
- `any` vs `unknown`?
  - `any` makes you do anything.. depending on how you set your compiler settings & linters.
  - `unknown` you have to narrow down to the type needed.
    - like catching `error`s, it is of an unknown type and has to be narrowed down to the type you expect.
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped): The repository for high quality TypeScript type definitions.
- _Time Elapsed:_ `~30H30M`
- _Stopped at:_ `P9D - FINISHED`
