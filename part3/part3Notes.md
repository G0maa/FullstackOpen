* I should probably delete some stuff from here.
# `Part 3: (a)` Node.js and Express
* Our goal is to implement a backend that will work with the notes application from part 2.
* Use `npm init`.
* `require('http')`, is the built-in web server module in `NodeJS`.
* ^ similar to `import http from 'http'`
  * These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and taken into use with an import.
    * Node.js uses so-called CommonJS modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification.
      * Node supports now also the use of ES6 modules, but since the support is yet not quite perfect we'll stick to CommonJS modules.
* The code uses the createServer method of the http module to create a new web server.
* event handler is registered to the server that is called every time an HTTP request is made to the server's address.
* **The primary purpose of the backend server in this course is to offer raw data in the JSON format to the frontend.**
* The notes array gets transformed into JSON with the JSON.stringify(notes) method.
* Many libraries have been developed to ease server side development with Node, by offering a more pleasing interface to work with the built-in http module.
* The caret in the front of `^4.17.2` means that if and when the dependencies of a project are updated, the version of express that is installed will be at least 4.17.2.
* If the major number of a dependency does not change, then the newer versions should be backwards compatible.
* Right at the beginning of our code we're importing express, which this time is a **function**.
* It's worth noting that JSON is a string, and not a JavaScript object like the value assigned to `notes`.
* Interactive `node-repl` => type `node` in the command line.
* `nodemon` automatically restart application if any files change.
* About development-dependendcies:
  * `npm install --save-dev` for defining moodules as a development dependecy.
  * By development dependencies, we are referring to tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like nodemon.
* REST is an architectural style meant for building scalable web applications.
* We mentioned in the previous part that singular things, like notes in the case of our application, are called resources in RESTful thinking. Every resource has an associated URL which is the resource's unique address.
* About `REST`, at least in the way conveyed by FSO:
  * You have root address e.g.(`https://www.example.com/api`)
  * You decided that the resource type for `note` is `notes` i.e.(`[Notes](https://www.example.com/api/notes)`)
  * One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier.
    * There fore each resource has unique address e.g. (`www.example.com/api/notes/10`)
  * Refer to the [table](https://fullstackopen.com/en/part3/node_js_and_express#rest) for more info.
  * This is how we manage to roughly define what REST refers to as a uniform interface, which means a consistent way of defining interfaces that makes it possible for systems to co-operate.
  * Erm... tl;dr people say I am REST but they're not, including this one as pointed out by themselves, there's no agreement on it.
* parameters for routes in `express` using `:` => `'/api/notes/:id`
  * Now `app.get('/api/notes/:id', ...)` will handle all HTTP GET requests that are of the form `/api/notes/SOMETHING`, where `SOMETHING` is an arbitrary string.
  * accessed through `request.params.id`.
* `express` does many stuff "automatically".
* overriding default status message:
  * `response.statusMessage = "Note does not exist."`
* About testing different requests to your API:
  * curl
  * Postman
  * VS Code Rest Client
* The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
* Checkint http headers might be a good step in debugging.
* Defining a default property when it doesn't exist:
  * `important: body.important || false`
* About HTTP request types:
  * GET request should not change state.
  * HEAD is similar to GET only it doesn't send content in its body.
  * All HTTP requests except POST should be idempotent
  * GET, HEAD, OPTIONS, TRACE, are defined to be safe.
  * POST is the only HTTP request type that is neither safe nor idempotent. 
  * Idempotent: Regardless of how many times we repeat the request the result is the same.
  * Safe: No change to state.
* About middlewares:
  * Middleware are functions that can be used for handling request and response objects.
  * The express json-parser we took into use earlier is a so-called middleware.
    * the json-parser adds new property to request => `body`.
  * In practice, you can use several middleware at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.
  * Middleware functions are executed in order, so they have to be `use()` before routes, if middleware function is `use()` after routes that means it gets executed if the request doesn't fulfill any of the existing routes... aka the program goes to the end them `use()` it.
  * Kind of weird, this means that for each http request, the program goes from start to finish searching for a route & adding middlewares along the way... you'd assume that they've been already added?
* Logging sensetive data maybe dangerous & violate privacy law or business-standard.
---
---
### `Part 3: (b)` Deploying app to internet
* Will need to install `cors`, why? read article.
* We are using `heroku`, there's a somewhat deployment guide.
* About deployment:
  * First run both development buidls locally to make sure they work together.
  * Deploy backend to `heroku`, and run frontend locally and test if deployed backend works.
  * Build frontend & move it to backend folder.
  * Test both on develpment environment.
  * Deploy both to `heroku`.
* You can add more scripts to the backend `package.json` to [Streamlining deploying of the frontend](https://fullstackopen.com/en/part3/deploying_app_to_internet#streamlining-deploying-of-the-frontend)
---
---
### `Part 3: (c)` Saving data to MongoDB
* Debugging Node applications is slightly more difficult than debugging JavaScript running in your browser.
  * Instructor strongly believes in `debugging by printing`.
  * Also mentions VS Code Debugger.
  * Or Chrome dev tools using `node --inspect index.js`
* First thing to do where debugging: Find source of the problem
  * Question everything,
  * and be systematic of and eliminate possibilities one by one.
* The worst of all possible strategies is to continue writing code.
* MongoDB is a NoSQL - document databse.
* The reason for using Mongo as the database is its lower complexity with respect to a relational database.
* Document databases differ from relational databases in how they organize data as well as the query languages they support.
* *All our work is deployed to the cloud, even the database.*
  * We will be using MongoDB Atlas.
  * Why not use Heroku?
* MongoDB stores records (documents) into collections (analogue to tables in relaitonal databases).
* By default, a collection does not require its documents to have the same schema;
  *  i.e. the documents in a single collection do not need to have the same set of fields and the data type for a field can differ across documents within a collection.
  * They introduced `document validation rules` in MongoDB v3.2 (MongoDB v1.0 was 2009, v3.2 was 2015).
* The maximum BSON document size is 16 megabytes.
* There's an official JS library for MongoDB called `MongoDB Node.JS Driver`.
  * It is quite cumbersome to use, we will instead use `Mongoose`.
  * `Mongoose` could be described as an `object document mapper (ODM)`.
* MongoDB Atlas creates database automatically when (...) it does not exist.
* The schema tells Mongoose how the note objects are to be stored in the database.
* the first "Note" parameter is the singular name of the model. The name of the collection will be the lowercased plural notes
* Document databases like Mongo are schemaless
* Mongoose can create schema at the level of the application.
* Models are so-called constructor functions that create new JavaScript objects based on the provided parameters.
* If the connection is not closed, the program will never finish its execution.
* The result of the save operation is in the result parameter of the event handler
* The objects are retrieved from the database with the find method of the Note model.
  * The parameter of the method is an object expressing search conditions
* Now the notes variable is assigned to an array of objects returned by Mongo. When the response is sent in the JSON format, the toJSON method of each object in the array is called automatically by the JSON.stringify method.
* There are like 3 conversions in the `database-backend` connection,
  * The database retrns an object (regardless of how it looks),
  * then when we send it there are a few things happening
  * `toJSON` function in the `schema` is called on each document.
  * then we call the `JSON.stringify()`.
* Only once everything has been verified to work in the backend, is it a good idea to test that the frontend works with the backend. It is highly inefficient to test things exclusively through the frontend.
* It's recommended to:
  * Implement backend feature
  * Test backend.
  * Integrate with frontend.
  * Test.
  * Check database state.
  * Move to next feature.
* When newly introducing database to the project, little scripts like `mongo.js` could help.
* When dealing with Promises, it's almost always a good idea to add error and exception handling, because otherwise you will find yourself dealing with strange bugs.
  * It's never a bad idea to print the object that caused the exception to the console in the error
* Moving error handling into middleware => Handle them in a sinlge place.
* If next was called without a parameter, then the execution would simply move onto the next route or middleware.
* 
* Note that the error handling middleware has to be the last loaded middleware.
* The execution order of middleware is the same as the order that they are loaded into express with the app.use function.
* The middlewares and routes get executed (or tested) in order of the `.use()` or `app.(httprequest)`.
  * I suppose the only reason `unknownEndpoint` doesn't get called on errors
  * is that it doesn't have that parameter, otherwise it would.
* `findByIdAndUpdate` method receives a regular JavaScript object, not a new note object created with the Note constructor function.
  * also `{new: true}` makes sure that the returned object is the object **after** the update.
---
---
### `Part 3: (d)` Validation and ESLint
* a smarter way (than if conditions) of validating is to use mongoose to validate.
* The minLength and required validators are built-in and provided by Mongoose. The Mongoose custom validator functionality allows us to create new validators, if none of the built-in ones cover our needs.
* If we try to store an object in the database that breaks one of the constraints, the operation will throw an exception.
* In the JavaScript universe, the current leading tool for static analysis aka. "linting" is ESlint.
* Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.
* Many companies define coding standards that are enforced throughout the organization through the ESlint configuration file. It is not recommended to keep reinventing the wheel over and over again, and it can be a good idea to adopt a ready-made configuration from someone else's project into yours.
---
---
* How can I define my own erros?, for example I want to deal with delete requests to non-existent notes with raising an error that is dealt with in the error handling middleware.
### END.
* *Time Elapsed:* `~19H00M`