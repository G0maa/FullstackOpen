# `Part 4: (a)` Structure of backend application, introduction to testing
* At the beginning of this part we are bing told about Node.JS project structure.
  * I can finally breath less heavily when I look at my VS code folder :)
* Extracting logging into its own module is a good idea in more ways than one. If we wanted to start writing logs to a file or send them to an external logging service like graylog or papertrail we would only have to make changes in one place.
* **Is everything a middleware?**
* A router object is an isolated instance of middleware and routes. 
  * You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
  * The router is in fact a middleware, that can be used for defining "related routes" in a single place, that is typically placed in its own module.
* Two ways of exporting.
```JS
module.exports = {
  info, error
}
```
```JS
module.exports = notesRouter
```
* To 'automated testing' we marsh!
  * We have completely neglected one essential area of software development, and that is automated testing.
  * Jest is a natural choice for this course, as it works well for testing backends, and it shines when it comes to testing React applications
* Individual test cases are defined with the test function. The first parameter of the function is the test description as a string. The second parameter is a function, that defines the functionality for the test case.
* `expect` wraps the resulting value into an object that offers a collection of matcher functions, that can be used for verifying the correctness of the result.
* About writing tests:
  * You are bound to run into problems while writing tests.
  * Remember how to debug like in part3 (logging or debugger).
  * You can focus on one test only when it's failing using `only()` or `-t` flag.
---
---
# `Part 4: (b)` Testing the backend
* About testing:
  * Currently we don't have many functions to do `unit test`.
  * In some situations we use mocking database for testing e.g. `mongodb-memory-server`
  * We will do testing through REST API.
    * Tests that include many components are called `integration testing`.
* It is common practice to define separate modes for development and testing.
  * through `NODE_ENV=`
* `--runInBand` option prevents `Jest` from running parallel tests.
* There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the `cross-env` package as a development dependency.
  * If you are deploying this application to heroku, keep in mind that if cross-env is saved as a development dependency, it would cause an application error on your web server.
* Through different modes we -for example- can have a separate database for running test.
  * We can have separate database in `MongoDB Atlas`, not optimal for concurrently running tests.
  * the optimal solution is to have many databases locally thorugh `running Mongo in-memory` or `Docker`.
* The config module that we have implemented slightly resembles the node-config package.
* The Async/await syntax can be used for writing asynchronous code with the appearance of synchronous code.
* Actually Mongoose documentation does not recommend testing Mongoose applications with Jest.
* supertest takes care that the application being tested is started at the port that it uses internally.
* In order to make our tests more robust, we have to reset the database and generate the needed test data in a controlled manner before we run the tests.
* About running specific tests:
  * `npm test -- tests/note_api.test.js`.
  * `npm test -- -t "test name/describe block"`, partial name allowed.
* When running a single test, the mongoose connection might stay open...
* About asnychronous functions:
  * First there was a `callback hell`, this could happen in async or sync.
  * then there was `.then()/.catch()` _ES6_ chain.
  * then there was `generator functions.`
  * and finally we have `async/await` _ES7_.
* About `async/await`
  * In order to use the await operator with asynchronous operations, they have to return a promise.
  * Using await is possible only inside of an async function.
* When code gets refactored, there is always the risk of `regression`, meaning that existing functionality may break.
  * We had a code _"working"_ with promises & chaining them,
  * When we needed to refacttor to use `async/await` we first wrote tests for the code,
  * then refactored it.
* With `async/await` the recommended way of dealing with exceptions is the old and familiar `try/catch`
  * The catch block simply calls the next function, which passes the request handling to the error handling middleware.
* In some tests you might have to do `serilaization & parsing` manually, like the what the server does.
* Async/await unclutters the code a bit, but the 'price' is the try/catch structure required for catching exceptions.
  * "solved" with `express-async-errors`, this library implicitly calls `next()` too.
* The `Promise.all` method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved.
  * `Promise.all` executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a `for...of` block, that guarantees a specific execution order.
* The asynchronous nature of JavaScript can lead to surprising behavior, and for this reason, it is important to pay careful attention when using the async/await syntax. Even though the syntax makes it easier to deal with promises, it is still necessary to understand how promises work!
* This way of testing the API, by making HTTP requests and inspecting the database with Mongoose, is by no means the only nor the best way of conducting API-level integration tests for server applications. There is no universal best way of writing tests, as it all depends on the application being tested and available resources.
* * It's worth noting that the `toContain()` method uses the `===` operator for comparing and matching elements, which means that it is often not well-suited for matching objects. In most cases, the appropriate method for verifying objects in arrays is the `toContainEqual` matcher.
---
---
# `Part 4: (c)` User administration
* Users should be stored in the database and every note should be linked to the user who created it. Deleting and editing a note should only be allowed for the user who created it.
  * Doing this in relational databases is straightforward.
  * document databases the situation is a bit different, as there are many different ways of modeling the situation.
  * Like with all document databases, we can use object id's in Mongo to reference documents in other collections. This is similar to using foreign keys in relational databases.
    * Erm...so what's the difference again?
* Traditionally document databases like Mongo do not support join queries that are available in relational databases, used for aggregating data from multiple tables.
  * However starting from version 3.2. Mongo has supported lookup aggregation queries.
* If we need a functionality similar to join queries, we will implement it in our application code.
* Document databases do not demand the foreign key to be stored in the note resources, it could also be stored in the users collection, or even both. (Refer to material)
* The structure and schema of the database is not as self-evident as it was with relational databases. 
* Paradoxically, schema-less databases like Mongo require developers to make far more radical design decisions about data organization at the beginning of the project than relational databases with schemas.
* About database design:
  * You can have note _id in user collection as an array.
  * You can have user _id in note collection as an "foreign" id.
  * Or both.
  * Or "physically" nest every note in the user collection.
* We are essentially practicing test-driven development (TDD), where tests for new functionality are written before the functionality is implemented.
* We would like our API to work in such a way, that when an `HTTP GET` request is made to the `/api/users` route, the user objects would also contain the contents of the user's notes, and not just their id. In a relational database, this functionality would be implemented with a `join query.`
*  `join queries` in relational databases which are `transactional`, meaning that the state of the database does not change during the time that the query is made.
   * With join queries in Mongoose, nothing can guarantee that the state between the collections being joined is consistent, meaning that if we make a query that joins the user and notes collections, the state of the collections may change during the query.
   * The Mongoose join is done with the populate method.
* The parameter given to the populate method defines that the ids referencing note objects in the notes field of the user document will be replaced by the referenced note documents.
  * I suppose he'd search for the `notes` collection in the same database.
---
---
# `Part 4: (d)` Token authentication
* The digital signature ensures that only parties who know `the secret`can generate a valid token. The value for the environment variable must be set in the `.env` file.
* If the application has multiple interfaces requiring identification, JWT's validation should be separated into its own middleware. Some existing library like `express-jwt` could also be used.
  * So each `controller` demanding its own identification has its own middleware?
* Token authentication is pretty easy to implement, but it contains one problem. Once the API user, eg. a React app gets a token, the API has a blind trust to the token holder
* What if the access rights of the token holder should be revoked?
  * Expiration time, more safe, but pain to the user.
  * The other solution is to save info about each token to backend database and to check for each API request if the access right corresponding to the token is still valid. With this scheme, the access rights can be revoked at any time. This kind of solution is often called a `server side session`.
    * Now I suppose that a `token` without saving it to database (with or without expiration date), is much worse than a `server side session`.
    * That is why it is a quite common to save the session corresponding to a token to a key-value-database such as Redis that is limited in functionality compared to eg. MongoDB or relational database but extremely fast in some usage scenarios.
* When server side sessions are used, the token is quite often just a random string, that does not include any information about the user as it is quite often the case when jwt-tokens are used. For each API request the server fetches the relevant information about the identitity of the user from the database. It is also quite usual that instead of using Authorization-header, cookies are used as the mechanism for transferring the token between the client and the server.
* Usernames, passwords and applications using token authentication must always be used over `HTTPS`.
* About JWT:
  * You log-in given your username & password.
  * backend generates a digitally signed token.
  * each time you post a blog backend verifies that token.
---
---
* ESLint is... ~~boring~~ nvm added few rules.
* if `npm start` is production then what it is when it's deployed to heroku?
  * Same thing I guess, heroku runs the project through `npm start`.
* Are all callback functions `async`? aka they go into the evenloop for them to execute?
  * Searched a bit, I think no, they normally get added to the stack as a function call.
* So when does `toJson` work again?
  * When you sent the object?
* Make `GET` requests to `/api/users` either work in development only
  * or using some username & password for admin user.
* What other types exist of user authentication? (other than token authentication)
* ??"If the password is correct, a token is created with the method jwt.sign. The token contains the username and the user id in a digitally signed form."??
  * What exactly is `process.env.SECRET`??
  * So, if the hacker knows the `process.env.SECRET` I'm screwed?
  * Nvm.. I clearly don't understand how `jwt` works so => ~~re~~search.
* Mhm... all these security related stuff is very important.

### END.
* *Time Elapsed:* `~25H20M` Took lots of time this time : )
* *Stopped at:* `P4 - Done.`