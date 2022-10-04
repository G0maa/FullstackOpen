```
For most of the use cases of this course, I personally would have chosen to use a relational database.
```

### `Part 13: (A)` Using relational databases with Sequelize

- About `MongoDB`: **database level**
  - Document database.
  - Schemaless, i.e. limited awareness of wahtk ind of data is stored in its collections.
  - Does know the types of the fields of the stored entities, but it has no information about which collection of entities the user record ids are referring to.
  - Does not care what fields the entities stored in the collections have.
- Pros/Cons
  - Faster development
  - Programmer has to make sure fields are correct, e.g. reference to some other collection, all manadatory fields are there, etc...
- About Relational DBs:
  - Lean haavily on schema.
  - Pros/Cons/Differences opposite of ^.
- `sequelize` is the library through which we use `Postgres`. Sequelize is a so-called `Object relational mapping (ORM)` library that allows you to **store JavaScript objects in a relational database without using the SQL language itself**, similar to Mongoose that we used with MongoDB.
- Instead of the `create` method, it is also possible to save to a database using the `build` method first to create a Model-object from the desired data, and then calling the `save` method on it.
- You can mirror the schema you have in your code to your DB using `modelName.sync()`.
- To make result of DB request more readable,
  - Try `note.toJSON()` or `JSON.stringify(notes)`.
  - `console.log(JSON.stringify(notes, null, 2))`

### `Part 13: (B)` Join tables and queries

-

---

- Some Postgres/SQL commands:
  - `\d <Optional Table Name>`
  - `\du`
  - `Model.findbyPk`
- When using `Sequelize`, each table in the database is represented by a model, which is effectively it's own **JavaScript class**.
- _Time Elapsed:_ `~04H20M`
- _Stopped at:_ `P13B - Join tables and queries`
