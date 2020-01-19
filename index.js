const { ApolloServer } = require('apollo-server')

const db = require('./db')
const { typeDefs } = require('./typeDefs')

const resolvers = {
  Query: {
    books: () => db.books,
    users: () => db.users
  },
  Mutation: {
    addUser: (_, {username, name}) => {
      const id = Math.floor(Math.random()*1000).toString()
      const user = {
        id,
        username,
        name
      }
      db.users.push(user)
      return user
    }
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
