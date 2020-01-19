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
    books: [Book!]!
    users: [User!]!
  }
`

const resolvers = {
  Query: {
    books: () => db.books,
    users: () => db.users
  },
  Book: {
    author: (_, params, ctx, info) => {
      return db.users.find(user => user.id === _.author)
    }
  },
  User: {
    books: _ => db.books.filter(book => book.author === _.id)
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
