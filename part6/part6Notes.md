### `Part 6: (a)` Flux-architecture and Redux
* So far, we have followed the state management conventions recommended by React.
  * Lifting state-up
  * Passing states in props
  * ?Having most of the state methods & logic in the app?
* In Flux, the state is separated completely from the React-components into its own stores.
  * We do not change `state` in `stores` directly we do it through some `action`.
![img](flux_arc.png)
* About Redux:
  * The whole state of the application is stored into **one** JavaScript-object in the store.
  * If the state was more complicated, different things in the state would be saved as separate fields of the object.
  * The state of the store is changed with `actions`. Actions are **objects**, which have at least a field determining the type of the action.
  * The impact of the action to the state of the application is defined using a `reducer`. In practice, a reducer is a function which is given the current state and an action as parameters. It returns a new state.
    * the `switch statement` is the most common approach to write a reducer.
  * Reducer is never supposed to be called directly from the applications code. 
    * Reducer is only given as a parameter to the createStore-function which creates the store
  * The store now *uses the reducer* to handle *actions*, which are dispatched or 'sent' to the store with its *dispatch-method*.
  * The third important method the store has is subscribe, which is used to create callback functions the store calls whenever an action is dispatched to the store.
  * In the example we had to manually re-render the app to reflect the change in state.
  * Reducers have to be pure functions tl;dr, don't changne state directly instead return new object of the _new_ state. 
* It is noteworthy that we have not bound the state of the form fields to the state of the App component like we have previously done. React calls this kind of form uncontrolled. (i.e. using native state implementations using `useStae`)
  * Uncontrolled forms have certain limitations (for example, dynamic error messages or disabling the submit button based on input are not possible).
* The components doesn't have to know about the particular actions, instead they can be separated into their own functions, then called when needed.
* There are multiple ways to share the redux-store with components.
  * Let's start with `react-redux` library using `hooks-api`.
* If the application has many components which need the store, the App-component must pass store as props to all of those components.
* About `useSelector()`
```JS
const importantNotes = useSelector(state => state.filter(note => note.important))  
```
* Unlike in the React code we did without Redux, the event handler for changing the state of the app (which now lives in Redux) has been moved away from the App to a child component.
* Note, responsible for rendering a single note, is very simple, and is not aware that the event handler it gets as props dispatches an action. These kind of components are called `presentational` in React terminology.
  * Notes, on the other hand, is a container component, as it contains some application logic: it defines what the event handlers of the Note components do and coordinates the configuration of presentational components, that is, the Notes.
---
---
### `Part 6: (b)` Many reducers
* It looks like in the case of combined reducers, the `copy` happens to that reducers property only.
* The combined reducer works in such a way that every action gets handled in every part of the combined reducer. Typically only one reducer is interested in any given action, but there are situations where multiple reducers change their respective parts of the state based on the same action.
* Notice: we used `filterReducer` to change only the state of the property `filter` in `store`.
  * i.e. we didn't use it to change the state of `notes` too (meaning fitlering them)
  * instead we fitlered them in their respective component, using `useSelector()`.
* `Redux Toolkit` is a library that solves these common Redux-related problems.
  * Off to refactoring our code to it -we go.
* The `createSlice` function's `name` parameter defines the prefix which is used in the action's type values. For example the `createNote` action defined later will have the type value of `notes/createNote`.
```JS
dispatch(createNote('Redux Toolkit is awesome!'))
dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })
```
* Redux Toolkit utilizes the `Immer` library with reducers created by `createSlice` function, which makes it *possible to mutate the state* argument inside the reducer.
  *  **Immer uses the mutated state to produce a new, immutable state and thus the state changes remain immutable.**
* The reducer can be accessed by the `noteSlice.reducer` property, whereas the action creators by the `noteSlice.actions` property.
---
---
### `Part 6: (c)` Communicating with server in a redux application
* why didn't we use await in place of promises and event handlers (registered to `then`-methods)?
  * `await` only works inside `async` functions, and the code in index.js is not inside a function, so due to the simple nature of the operation, we'll abstain from using async this time.
* About adding `dispatch` to the *dependency array* of `useEffect`:
  * If the value of the dispatch-variable would change during runtime, the effect would be executed again. This however cannot happen in our application, so the warning is unnecessary.
* it is not great that the communication with the server happens inside the functions of the components.
```JS
useEffect(() => {
  dispatch(initializeNotes()))  
},[dispatch]) 

useEffect(() => {
  anecdoteService.getAll().then((response) => {
    dispatch(setAnecdotes(response))
  })
}, [dispatch])
```
  * These kind of async actions can be implemented using the `Redux Thunk` library. The use of the library doesn't need any additional configuration when the Redux store is created using the Redux Toolkit's `configureStore` function.
* Redux Thunk it is possible to implement action creators which return a function instead of an object.
* Redux Toolkit offers a multitude of tools to simplify asynchronous state management. Suitable tools for this use case are for example the `createAsyncThunk` function and the `RTK Query` API.
---
---
### `Part 6: (d)` connect
* I guess this is just pre-hooks era.
* To finish this part we will look into another older and more complicated way to use redux, the `connect`-function provided by `react-redux`.
  * ** In new applications you should absolutely use the hook-api ** , but knowing how to use connect is useful when maintaining older projects using redux.
* The `connect` function accepts a so-called `mapStateToProps` function as its first parameter. The function can be used for defining the props of the connected component that are based on the state of the Redux store.
```JS
// These functions need to be defined.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
```
* The action creator can also be referenced directly by calling `createNote`. You should not do this, since this is the unmodified version of the action creator that does not contain the added automatic dispatch.
* The functions passed in `mapDispatchToProps` must be action creators, that is, functions that return Redux actions.
* there are situations where the more complicated definition is necessary, like if the dispatched actions need to reference the props of the component.
* Dividing the application into presentational and container components is one way of structuring React applications that has been deemed beneficial. The division may be a good design choice or it may not, it depends on the context.
* **After the React hook-api was published, HOCs have become less and less popular.** Almost all libraries which used to be based on HOCs have now been modified to use hooks. Most of the time hook based apis are a lot simpler than HOC based ones, as is the case with redux as well.
* Presentational/Container components concept is coined by `Dan Abramov` creator of Redux.
* About presentation components:
  * are concerned with how things look.
  * Have no dependencies on the rest of the app, such as Redux actions or stores.
  * May contain both presentational and container components inside, and usually have some DOM markup and styles of their own.
  * Don’t specify how the data is loaded or mutated.
  * Rarely have their own state (when they do, it’s UI state rather than data).
* About Container components:
  * Are concerned with how things work.
  * May contain both presentational and container components inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
  * Provide the data and behavior to presentational or other container components.
  * Call Redux actions and provide these as callbacks to the presentational components.
  * Are often stateful, as they tend to serve as data sources.
---
---
* I dunno why, but I feel like the Filter.js was a bit faster using `hooks` than `redux`.
* [To re-read](https://fullstackopen.com/en/part6/connect#presentational-container-revisited)
* [redux tutorial](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)
* Debugging trick: try printing the functions 🧐
* I don't quite well understand the need of `Thunks`.
  * We could have easily _abstracted_ the code into its ?own? module,
  * without the need of actually returning a fucntion to an `action creator`
  * ~~to-test, hopefully.~~
  * ~~We could have created something like `reduxActions.js`, that really takes these functions out, like the second example.~~
    * tl;dr you can only put `#this_call` inside React components or Custom hooks.
    * `thunks` are a way of let's say... chaining dispatches.
```JS
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
dispatch(initializeNotes()) 
// ######
export const initializeNotes = async () => {
  const notes = await noteService.getAll()
  dispatch(setNotes(notes)) // #this_call
}
initializeNotes()
```
* **REVISE THE SETTING & DELETION OF NOTIFICATION**
* In native hooks, we used to know where the re-rendering works,
  * but in redux... I'm kind of confused, my best bet is that `react-redux` deals with that internally through the custom hooks...
* How do ?custom? `react-hooks` work?
* `deep-freeze` library makes sure that objects used with it are immutable.
* `+2H00M` Reading about react state managment & SSR vs CSR, and various other stuff really.
* I guess I have to learn `Redux-Toolkit`.
  * And to get used to `array spread syntax` & `destructuring` 🤔
```JS
const numbers = [1, 2, 3]
const newNumbers = [...numbers, 4, 5] // copy

const numbers = [1, 2, 3, 4, 5, 6]
const [first, second, ...rest] = numbers
```
* About Test Driven Development:
  * We agreed on the input & output
  * Wrote tests,
  * wrote code,
  * then **refactor**.
* *Time Elapsed:* `~10H35M`
* This one somehow took much less time than the usual, I might have forgot a day or so 🤨, anyway no time for OCD.
* *Stopped at:* `P6 - Finished.`