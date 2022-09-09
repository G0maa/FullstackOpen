const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("./models/user");
const Author = require("./models/author");
const Book = require("./models/book");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "U0VDUkVUS0VZ"; // SECRETKEY

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // didn't know how to make it look good without 4 if conidions.
      // if add more feature +1 if condition...
      // const ans = await Book.find({
      //   author: args.author,
      //   genres: { $in: args.genre },
      // });

      let ans = await Book.find({}).populate("author");

      // Not sure if this is "clean" code.
      if (args.author) {
        const authorQuery = await Author.findOne({ name: args.author });

        if (!authorQuery) return [];

        ans = ans.reduce((booksArr, element) => {
          if (authorQuery._id.toString() === element.author.toString())
            return [...booksArr, element];
          return booksArr;
        }, []);
      }

      if (args.genre) {
        ans = ans.reduce((booksArr, element) => {
          if (element.genres.find((genre) => genre === args.genre))
            return [...booksArr, element];
          return booksArr;
        }, []);
      }

      return ans;
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => {
      const books = await Book.find({});

      const allGenres = new Set();

      books.forEach((book) => {
        book.genres.forEach((genre) => allGenres.add(genre));
      });

      return allGenres;
    },
    me: (root, args, context) => context.currentUser,
  },
  Book: {
    // This adds too much time.
    // author: async (root) => {
    //   // instead of here.. yea?
    //   const bookAuthor = await Author.findOne({ _id: root.author });
    //   return bookAuthor;
    // },
  },
  Author: {
    // bookCount: async (root) => {
    //   // 1. returns all books objects
    //   // 2. doesn't this indicate +1 request for each author? i.e. extremely bad performence?
    //   const ans = await Book.find({ author: root._id });
    //   return ans.length;
    // },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // Where's my middlewares?
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
          bookCount: 1,
        });
      } else {
        author.bookCount += 1;
      }
      const book = new Book({ ...args, author });

      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.name,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      // Where's my middlewares?
      if (!context.currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      const author = await Author.findOne({ name: args.name });

      // I think this normally wouldn't work in React/Redux?
      // Didn't like the try/catch thing.
      if (!author) {
        throw new UserInputError("User non-existent", {
          invalidArgs: args.name,
        });
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
