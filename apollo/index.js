const { ApolloServer } = require('apollo-server')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')

module.exports = function Apollo (ssbServer) {
  const apollo = new ApolloServer({
    typeDefs,
    context: {
      ssb: ssbServer,
      ssbp: promisify(ssbServer),
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

function promisify (ssbServer) {
  return {
    latestSequence: toPromise(ssbServer.latestSequence),
    about: {
      socialValue: toPromise(ssbServer.about.socialValue)
    }
  }
}

function toPromise (nodeback) {
  return function () {
    return new Promise((resolve, reject) => {
      nodeback.call(this, ...arguments, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}
