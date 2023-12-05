import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Query {
    me {
      _id
      email
      bookCount
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
