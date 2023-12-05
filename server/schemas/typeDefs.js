const typeDefs = `
type Query {
  me: User
}

type Mutation {
  loginUser(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookInput: BookInput!): User
  removeBook(bookId: String!): User
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int!
  savedBooks: [Book]!
}

type Book {
  bookId: String!
  authors: [String!]!
  description: String!
  title: String!
  image: String
  link: String
}

type Checkout {
  session: ID
}

type Auth {
  token: ID
  user: User
}

input BookInput {
  authors: [String!]!
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}
`;

module.exports = typeDefs;
