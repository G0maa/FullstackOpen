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
* 
---
---
### END.
* *Time Elapsed:* `~1H52M`
* *Stopped at:* `P3A - Deleting resources`