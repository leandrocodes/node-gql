const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    id: ID!
    author: User!
    title: String
  }

  type User {
    id: ID!
    username: String!
    name: String
    books: [Book!]
  }

  type Query {
    books: [Book!]!
    users: [User!]!
  }

  type Mutation {
    addUser(username: String!, name: String): User!
  }

`
module.exports = { typeDefs }
