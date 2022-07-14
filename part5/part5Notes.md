### `Part 5: (a)` Login in frontend
* I downloaded the partCode from github, too lazy this time : )
* 1 Hour of fixing react bugs, downgraded to 17.0.1 and now everything works.
* A slightly odd looking, but commonly used React trick is used to render the forms conditionally.
* Our main component App is at the moment way too large. The changes we did now are a clear sign that the forms should be refactored into their own components. However, we will leave that for an optional exercise.
* Our application has a flaw: when the page is rerendered, information of the user's login disappears.
  * This problem is easily solved by saving the login details to `local storage`. Local Storage is a `key-value` database in the browser.
  * The storage is `origin-specific` so each web application has its own storage
  * When we need to save to `local storage`, we have to `JSON.stringify()`, when we want  to return it we have too `JSON.parse()`.
* We still have to modify our application so that when we enter the page, the application checks if user details of a logged-in user can already be found on the local storage.
  * The right way to do this is with an effect hook: a mechanism we first encountered in `part 2`, and used to fetch notes from the server.
* Now a user stays logged-in in the application forever.
  * Wow, I made a digital prison :O
* 
```JS
{user === null ?
    loginForm() :
    noteForm()
}
```
* A note on using local storage:
  * A challange with `token based authentication` is revoking the access of the token holder when needed.
    * Two solutions:
      * Limit validity period of a token.
      * or save something to backend database `server side session.
  * No matter how the validity of tokens is checked and ensured, saving a token in the local storage might contain a security risk if the application has a security vulnerability that allows `Cross Site Scripting (XSS) attacks`.
  * It has been suggested that the identity of a signed in user should be saved as httpOnly cookies.
  * [minimize the risk of XSS attacks](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
---
---
### `Part 5: (b)` props.children and prototypes
* This part of the course is mainly trying to introduce the idea of `props.chidlren`, and how to use it.
  * It is similar to higher-order-functions in JS, you make a **reusable** container that does some general process, and pass different specific process elementss to it.
* The state and all the functions related to it are defined outside of the component and are passed to the component as props.
* The code related to managing the visibility of the login form could be considered to be its own logical entity
* The new and interesting part of the code is `props.children`, that is used for referencing the child components of the component. The child components are the React elements that we define between the opening and closing tags of a component.
* Unlike the "normal" props we've seen before, `children` is automatically added by React and always exists.
  * If a component is defined with an automatically closing `/>`tag, Then props.`children` is an empty array.
* The Togglable component is reusable and we can use it to add similar visibility toggling functionality to the form that is used for creating new notes.
```"Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.```
* There is a slight problem with hiding the form. The visibility is controlled with the visible variable inside of the Togglable component.
  * let's use the ref mechanism of React, which offers a reference to the component.
  * There are many ways to implement closing the form from the parent component.
  * The `noteFormRef` variable acts as a reference to the component. This hook ensures the same reference (ref) is kept throughout re-renders of the component.
  * The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
  * The component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component.
* So far this is the only situation where using React hooks leads to code that is not cleaner than with class components.
* **We create three separate instances of the component that all have their own separate state.**
* The expected and required props of a component can be defined with the `prop-types` package.
* Create-react-app has installed ESlint to the project by default, so all that's left for us to do is to define our desired configuration in the .eslintrc.js file.
  * do not run the `eslint --init` command. It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!
---
---
### `Part 5: (c)` Testing React apps
* Back to testing... again :(
* Normally React components are rendered to the DOM. The render method we used renders the components in a format that is suitable for tests without rendering them to the DOM.
* We can use the object `screen` to access the rendered component. We use screen's method `getByText` to search for an element that has the note content and ensure that it exists.
* Create-react-app configures tests to be run in watch mode by default, which means that the `npm test` command will not exit once the tests have finished, and will instead wait for changes to be made to the code.
* In React there are (at least) two different conventions for the test file's location. We created our test files according to the current standard by placing them in the same directory as the component being tested.
  * Gonna change that asap.
* We could also use `CSS-selectors` to find rendered elements by using the method `querySelector` of the object `container` that is one of the fields returned by the `render`.
  * There are also other methods, eg. `getByTestId`, that is looking for elements based on id-attributes that are inserted to the code specifically for testing purposes.
  * Tests gets the access to the the input field using the function `getByRole` and `getAllByRole`, `getByPlaceholderTest`.
* Object `screen` has method debug that can be used to print the HTML of a component to terminal.
* Install a library `user-event` that makes simulating user input a bit easier.
  * Mhm... I'll need a first-day manual after finishing FSO for all these different stuff .-.
* `Mock objects and functions` are commonly used stub components in testing that are used for replacing dependencies of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.
* Command `getByText` looks for an element that has exactly the same text that it has as a parameter, and nothing more.
  * try `, { exact: false }`
  * or `findByText`, which returns a promise so use `await`
* `queryByText` The command returns the element but it does not cause an exception if the element is not found.
  * We could use the command to ensure that something is not rendered to the component.
* Mhm...
  * Unit testing => Integration testing => E2E testing.
  * Snapshot tests notify the developer if the HTML code of the component changes.
---
---
### `Part 5: (d)` End to end testing
* So far we have tested the backend as a whole on an API level using integration tests, and tested some frontend components using unit tests.
  * Next we will look into one way to test the system as a whole using End to End (E2E) tests.
* E2E tests are potentially the most useful category of tests, because they test the system through the same interface as real users use.
* They do have some drawbacks too. Configuring E2E tests is more challenging than unit or integration tests. They also tend to be quite slow... during coding it is beneficial to be able to run tests as often as possible in case of code `regressions`.
* Cypress tests are run completely within the browser. Other libraries run the tests in a Node-process, which is connected to the browser through an API.
* About E2E testing liberaries:
  * Selenium, Headless browsers, Cypress.
* Unlike the frontend's unit tests, Cypress tests can be in the frontend or the backend repository, or even in their own separate repository.
  * The tests require the tested system to be running. Unlike our backend integration tests, Cypress tests do not start the system when they are run
* Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations
* Both buttons have the text login... If we search for a button by its text, cy.contains will return the first of them...
* each test starts from zero as far as the browser is concerned. All changes to the browser's state are reversed after each test.
* Ideally, the server's database should be the same each time we run the tests, so our tests can be reliably and easily repeatable.
  * As with unit and integration tests, with E2E tests it is the best to empty the database and possibly format it before the tests are run.
  * The solution is to create API endpoints to the backend for the test.
* Using `should` is a bit trickier than using contains, but it allows for more diverse tests than contains which works based on text content only.
  * [See](https://docs.cypress.io/guides/references/assertions.html#Common-Assertions)
* Some CSS properties behave differently on Firefox, thus may lead to tests failing.
* The Cypress documentation gives us the following advice: Fully test the login flow – but only once!. So instead of logging in a user using the form in the beforeEach block, Cypress recommends that we bypass the UI and do an HTTP request to the backend to log in. The reason for this is that logging in with an HTTP request is much faster than filling a form.
* all Cypress commands, are promises.
* Stopped at: Cypress sets token, but React refuses to see it that way.
* When coding tests, you should check in the test runner that the tests use the right components!
* When you use `.contains()` chained, it will search inside the element of the first `.contains()`
* `cy.get` always searches from the whole page, unlike `find()`
* `as()` could help reduce duplicate code.
* When Cypress runs a test, it adds each cy command to an execution queue. When the code of the test method has been executed, Cypress will execute each command in the queue one by one.
  * Stopping the test execution with the debugger is possible. The debugger starts only if Cypress test runner's developer console is open.
* Note that videos of the test execution will be saved to cypress/videos/, so you should probably git ignore this directory.
---
---
* `Cypress` has this [Real World App](https://github.com/cypress-io/cypress-realworld-app)
  * Where they appliede... Cypress.
* Mhm... when testing, most likely tests are failing because you wrote shitty code,
  * Happened twice.
* I guess most testing libraries return the `html element` in some way or form using functions like `getByX` or `contains`.
* `#` for css id selector, `.` for css class selector.
* So what's `XSS attacks` again? => ~~re~~search.
  * Done, watched [This video](https://youtu.be/pD6C1-zSxIM)
* The operations `setToken, setUser, save/get from local storage` seem very erm...    ?loosely coupled? from each other?, I'd prefer it if it was single function handles all three of them.
* Hmmm... [XSS - localStorage vs Cookies](https://academind.com/tutorials/localstorage-vs-cookies-xss)
* **"Mind you, it is extremely unprofessional to leave any red output to the browser console."**
### END.
* `+40M` quickly reviewing example solutions of part3 and part4.
* +`X minutes` for reading cypress documentation.
* *Time Elapsed:* `~22H00M`
* *Stopped at:* `P6 - Just started`