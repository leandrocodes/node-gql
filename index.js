const { ApolloServer, gql } = require('apollo-server')
const db = require('./db')

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
    books: [Book!]
  }
`

const resolvers = {
  Query: {
    books: () => db.books
  },
  Book: {
    author: (_, params, ctx, info) => {
      return db.users.find(user => user.id === _.author)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) => {
    console.log('listening ' + url)
  })
  .catch(err => console.log(err))
