import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      bookCount
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
      username
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation Mutation($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      _id
      bookCount
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation Mutation($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      email
      savedBooks {
        title
        authors
        bookId
        description
        image
        link
      }
      username
    }
  }
`;
