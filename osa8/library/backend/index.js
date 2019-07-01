const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

mongoose.set("useFindAndModify", false);

const MONGODB_URI =
  "mongodb+srv://antto:96Zrw8uIimd021wI@fullstack2019-kbi8a.mongodb.net/library?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        let books = [];
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (!author) {
            return [];
          }
          const authorId = author._id;
          if (args.genre) {
            books = await Book.find({ author: authorId, genres: args.genre });
          } else {
            books = await Book.find({ author: authorId });
          }
        } else {
          if (args.genre) {
            books = await Book.find({ genres: args.genre });
          } else {
            books = await Book.find({});
          }
        }

        return books;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    }
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root._id });
      return books.length;
    }
  },
  Book: {
    author: async root => {
      const author = await Author.findById(root.author);
      return {
        name: author.name,
        born: author.born
      };
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        const authorName = args.author;
        let author = await Author.findOne({ name: authorName });
        if (!author) {
          author = await new Author({ name: authorName });
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        });
        await book.save();
        await author.save();

        pubsub.publish("BOOK_ADDED", { bookAdded: book });

        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        if (!author) {
          return null;
        }
        await author.save();
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "salasana") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null;

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
