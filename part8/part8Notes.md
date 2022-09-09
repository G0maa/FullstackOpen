### `Part 8: (a)` GraphQL-sever

- Facebook's alternative to REST for communication between browser and server.
- In recent years, `GraphQL`, developed by Facebook, **has become popular for communication between web applications and servers.**
- tl;dr complex queries, that are laborious to code (client-side & server-side), can be handled with `GraphQL`.
- In the heart of all GraphQL applications is a schema,
  - schema is created of two `type`s.
    1. Describes the data sent between the client and the server.
    2. and `Query`, which tells what kind of queries can be made to the API.
- GraphQL query describes only the data moving between a server and the client. On the server, the data can be organized and saved any way we like.
- Despite its name, GraphQL does not actually have anything to do with databases. It does not care how the data is saved.
- all resolver functions are given four parameters.
- A GraphQL server must define resolvers for each field of each type in the schema.
- About the `default resolver`
  - The server knows to send back exactly the fields required by the query. How does that happen?

```js
query {
  findPerson(name: "Arto Hellas") {
    phone
    city
    street
  }
}
```

```js
// Defaul resolver is something like this
  Person: {
    name: (root) => root.name,
    phone: (root) => root.phone,
    street: (root) => root.street,
    city: (root) => root.city,
    id: (root) => root.id
  }
```

- The person-objects saved in the server are not exactly the same as the GraphQL type Person objects described in the schema.
  - Contrary to the Person type, the Address type does not have an id field, because they are not saved into their own separate data structure in the server.
  - Because the objects saved in the array do not have an address field, the default resolver is not sufficient.
- In GraphQL, all operations which cause a change are done with mutations.
- stricter rules for data sent to a Mutation have to be added manually.
- `enum` is used to "create" your own data type, since GraphQL has only few scalar data types.

### `Part 8: (b)` React and GraphQL

- We could take care of the communication between the React app and GraphQL by using Axios. However, most of the time, it is not very sensible to do so.
  - It is a better idea to use a higher-order library capable of abstracting the unnecessary details of the communication.
- The useQuery hook is well-suited for situations where the query is done when the component is rendered.
  - Use `useLazyQuery()` or `useQuery() + skip` to execute queries manually.
- `Apollo client` has built-in cache mechanism.
- We can define mutation functions using the useMutation hook. The hook returns an array, the first element of which contains the function to cause the mutation.
- After adding a person, change is not reflected and cache isn't automatically updated, aka need to refresh, Workarounds:
  - use `pollInterval` in `useQuery()`
    - Pointless web traffic
  - `refetchQueries` in `useMutation()`
    - If one use updates, it will not get reflected to other users.
  - **There are other ways to update the cache. More about those later in this part.**
- Handling errors is done through `onError` option.

```js
onError: (error) => {
  // setError is in props
  setError(error.graphQLErrors[0].message);
};
```

- Surprisingly, when a person's number is changed, the new number automatically appears on the list of persons rendered by the Persons component. This happens because each person has an identifying field of type ID, so the person's details saved to the cache update automatically when they are changed with the mutation.
- However, this solution does not work if the notify function is not wrapped to a useCallback function. If it's not, this results in an endless loop. When the App component is rerendered after a notification is removed, a new version of notify gets created which causes the effect function to be executed, which causes a new notification, and so on, and so on...
- In our example, management of the applications state has mostly become the responsibility of Apollo Client. This is a quite typical solution for GraphQL applications.

  - **As a result, it could be that there are no justifiable reasons to use Redux to manage application state when using GraphQL.**

- Few points
  - Editing a phone number updates cache automatically...
  - Adding a function (passed from props) to `useEffect` causes an infinite loop...
  - We now use Apollo Client as a state management library...
  - Somethign about `hooks provided by Apollo client 3.0`

### `Part 8: (C)` Database and user administration

- ?As we remember, in Mongo, the identifying field of an object is called \_id and we previously had to parse the name of the field to id ourselves. Now GraphQL can do this automatically.?
- When a resolver returns a promise, Apollo server sends back the value which the promise resolves to.
- The object returned by context is given to all resolvers as their third parameter.
  - Context is the right place to do things which are shared by multiple resolvers, like user identification.

### `Part 8: (D)` Login and updating the cache

- The link parameter given to the `client` object defines how apollo connects to the server. Here, the normal `httpLink` connection is modified so that the request's authorization header contains the token if one has been saved to the localStorage.
  - I'm not sure how does it recognize when I logged in?
  - from the [docs](https://www.apollographql.com/docs/react/api/link/apollo-link-context/):
  - ` It receives two arguments: the GraphQL request being executed, and the previous context.`
- Instead of re-querying `ALL_PERSONS` again, we handle updating the cache manually using `update:`
  - The callback function is given a reference to the cache and the data returned by the mutation as parameters.
  - Using the function `updateQuery` the code updates the query `ALL_PERSONS` in cache by adding the new person to the cached data.
  - In some situations, the only sensible way to keep the cache up to date is using the update callback.
- When necessary, it is possible to disable cache for the whole application or single queries by setting the field managing the use of cache, `fetchPolicy` as `no-cache`.

### `Part 8: (E)` Fragments and subscriptions

- It is pretty common in GraphQL that multiple queries return similar results.
  - These kinds of situations can be simplified with the use of `fragments`.
- The fragments **are not** defined in the GraphQL schema, but in the client. The fragments must be declared when the client uses them for queries.
- After an application has made a subscription, it starts to listen to the server. When changes occur on the server, it sends a notification to all of its subscribers.
  - Technically speaking, the HTTP protocol is not well-suited for communication from the server to the browser. So, under the hood, Apollo uses `WebSockets` for server subscriber communication.
- `apollo-server-express` is the Apollo Server package for `Express`, the most popular Node.js web framework. **It enables you to attach a GraphQL server to an existing Express server.**
- Mhm... we needed `apollo-server-express` to use subscribtions, and we installed more packages:
  - `npm install subscriptions-transport-ws graphql-subscriptions`
- There's a lot of "boiler-plate" code to _make_ a subscription.
  - `subscriptions-transport-ws` is deprecated, if need to use subscriptions in projects => Google it... so is `PubSub`...
- Adding a new person publishes a notification about the operation to all subscribers with PubSub's method `publish`.
- `personAdded` subscriptions resolver registers all of the subscribers by returning them a suitable iterator object.
  - An AsyncIterator object listens for events that are associated with a particular label (or set of labels) and adds them to a queue for processing.
- `split()` is used to make `subscription` link and normal `http` link.
- When a new person is added, the server sends a notification to the client, and the callback function defined in the `onSubscriptionData` attribute is called and given the details of the new person as parameters.
- using the fourth parameter of resolver functions, we could optimize the query even further.

---

- See how this part: https://fullstackopen.com/en/part8/database_and_user_administration#user-and-log-in:~:text=Let%27s%20also%20add%20functionality%20for%20adding%20an%20existing%20user%20to%20your%20friends%20list.%20The%20mutation%20is%20as%20follows%3A works in practice

- Something different:

  - I don't like `GraphQL`, and I dislike it even more as a state management library.
    - I can't see the problem that `GraphQL` solves, the only actualy use case I saw was "complex" queries _generally_.
      - Looks like `WebSocket` maybe a trivial use for `GraphQL`?
  - Erm... how does `context` and `setContext()` (in apollo client) work again?
  - You never stop going in circles in CS, Express -> GraphQL -> Express (again).
  - The instructor mentions the `n+1 Problem` and how with complex GraphQL queries it might appear depending on how the resolvers work, tl;dr => Too many DB requests.
    - Often, it requires using some kind of a join query instead of multiple separate queries.
      - Then why use GraphQL?
    - In our situation we added a new field in the DB for the feature we need... aka programmed it.

- Qs & As

  - What does `makeExecutableSchema` do?
  - It may seem counter inutivie how `server.applyMiddleware()` works, regardless intenrally it usess `app.use()`... among other things.
  - The plugin `ApolloServerPluginDrainHttpServer()` helps in shutting down the server.
  - How does `WebSocket` work?

- Error handling in GraphQL.
- Still trying to get my head around GQL.
- It feels/looks like `GraphQL` is like playing with _legos_.
- `GraphQL`, one `schemas`, consisting of `types`.
- For debugging mongoose -> `mongoose.set('debug', true);`
- Some further material at `P8E - n+1 Problem` and `Epilogue`.
  - Especially concerning structuring the application.
- `Premature optimization is the root of all evil - Donald Knuth`
- _Time Elapsed:_ `~24H00M`,
- _Stopped at:_ `Kind of finished? Solutions of 8.21, 8.22, and 8.25, are either bad or wrong, GraphQL in general needs more time to study.`

# This part was erm... "unique".. it needs further investigation since I didn't really understand all of it well.
