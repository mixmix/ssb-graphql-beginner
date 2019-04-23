const { ApolloServer } = require('apollo-server')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')

module.exports = function Apollo (ssbServer) {
  const apollo = new ApolloServer({
    typeDefs,
    context: {
      ssb: ssbServer,
      myId: ssbServer.id
    },
    resolvers
  })

  apollo.listen()
    .then(({ url }) => {
      console.log(`Server ready at ${url}`)
    })

  return apollo
}
