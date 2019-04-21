const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "a simple string to get started!"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'hello worlds!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen()
  .then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
