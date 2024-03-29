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

- Code level relationsips:
  - `Sequelize` does remaining stuff automatically, e.g. `user_id` field in `notes` table.
  - How did it know that it's a `One-to-many relationship`? i.e. only way is to have procssed both lines `hasMany` and `belongsTo`.
  - Also in `include`.. the type of `join` leans heavily on the type of relationship.

```js
User.hasMany(Note);
Note.belongsTo(User);
Note.sync({ alter: true });
User.sync({ alter: true });
```

- Defining the same thing at the class level:

```js
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
```

- otherwise Sequelize does not know how at the code level to connect the tables to each other.
  - There's no... reverse sync?
- in `Sequelize`:
  - Validators work on code level. (JavaScript)
  - Constraints work on SQL level. (Database)
- `query-parameter` e.g. `/api/notes?important=false`, starting from the `?`.
- `Sequelize` [converts](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators) infers every operator to some `Op.<operator name>` e.g.:
  - equal: `{ [Op.eq]: 2 }`
  - substring `{ [Op.substring] : "something" }`

### `Part 13: (C)` Migrations, many-to-many relationships

- In the past we used `.sync()` & `alter: true` to sync code-level to database-level, there's a "much more robust" way which is called `migrations`.
- In practice, a migration is a single JavaScript file that describes some modification to a database.
  - A separate migration file is created for each single or multiple changes at once.
  - Sequelize keeps a record of which migrations have been performed, i.e. which changes caused by the migrations are synchronized to the database schema.
  - When creating new migrations, Sequelize keeps up to date on which changes to the database schema are yet to be made.
  - In this way, changes are made in a controlled manner, with the program code stored in version control.
- We could run the migrations from the command line using the `Sequelize command line tool`. However, we choose to perform the migrations manually from the program code using the `Umzug` library.
- So **Sequelize** has created a `migrations table` that allows it to keep track of the migrations that have been performed.
- As noted in the end of Part 4, the way we implement disabling users here is problematic.
  - Whether or not the user is disabled is only checked at login,
  - if the user has a token at the time the user is disabled, the user may continue to use the same token,
  - since no lifetime has been set for the token and the disabled status of the user is not checked when creating notes.
- Validations in migrations have no effect, since they work code-level only.
- `many-to-many relationship` is traditionally implemented in relational databases using a `connection table`.

```
The User.hasMany(Note) definition therefore attaches a notes property to the user object, which gives access to the notes made by the user. The User.belongsToMany(Team, { through: Membership })) definition similarly attaches a teams property to the user object, which can also be used in the code:
```

- `Seqleuize` objects maybe be immutable.

- `eager` vs `lazy` fetch:
  - Eager: Give everything.
  - Lazy: Give only the mentioned things e.g. what's in the query parameters only.
- Models can have `scopes`, which is something similar to functions for the model,
  - e.g. show admins only
  - get users with names that match a string
  - i.e. functions that are used a lot, they can be chained too.
- Sequlize models are JS classes, so you can also add functions to them.
  - Instance methods for each instance, and static methods for a class method.
- However, the problem is that the definition of the model may change over time, for example the name field may change or its data type may change. Migrations must be able to be performed successfully at any time from start to end, and if the migrations are relying on the model to have certain content, it may no longer be true in a month or a year's time. Therefore, despite the "copy paste", the migration code should be completely separate from the model code.

---

- There are better & more secure implementations of server-side sessions, what's implemented here is for the sake of learning postgres only.
- I don't know what's the SQL for joining the 3 tables together.
- Some Postgres/SQL commands:
  - `\d <Optional Table Name>`
  - `\du`
  - `Model.findbyPk`
- When using `Sequelize`, each table in the database is represented by a model, which is effectively it's own **JavaScript class**.
- _Time Elapsed:_ `~18H30M`
- _Stopped at:_ `P13C - Finished`
