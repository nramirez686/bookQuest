const { User, Book } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error("Unauthorized access! Please log in.");
      }
      return await User.findById(user._id);
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const newUser = await User.create({
        username,
        email,
        password,
      });
      return newUser;
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, { bookInput }, { user }) => {
      if (!user) {
        throw new Error("Unauthorized access! Please log in.");
      }
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedBooks: bookInput } },
        { new: true }
      );
      return updatedUser;
    },
    removeBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new Error("Unauthorized access! Please log in.");
      }
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
  User: {
    savedBooks: async (parent, _, { models }) => {
      const bookIds = parent.savedBooks.map((book) => book.bookId);
      const books = await models.Book.find({ _id: { $in: bookIds } });
      return books;
    },
    bookCount: (parent) => {
      return parent.savedBooks.length;
    },
  },
};

module.exports = resolvers;
