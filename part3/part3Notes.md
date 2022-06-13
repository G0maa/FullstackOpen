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
* 
---
---
### END.
* *Time Elapsed:* `~0H30M`
* *Stopped at:* `P3A - Just started`