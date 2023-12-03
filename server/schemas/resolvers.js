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
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
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
