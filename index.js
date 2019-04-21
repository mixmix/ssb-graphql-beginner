const { ApolloServer, gql } = require('apollo-server')
const Client = require('ssb-client')
const Config = require('ssb-config/inject')

const config = Config('ssb', {})

Client(config.keys, config, (err, ssb) => {
  if (err) throw err

  const typeDefs = gql`
    type Query {
      "a simple string to get started!"
      hello: String,
      whoami: String
    }
  `

  const context = (req) => ({
    ssb: ssb
  })

  const resolvers = {
    Query: {
      hello: () => 'hello worlds!',
      whoami: (_, __, context) => {
        return new Promise((resolve, reject) => {
          context.ssb.whoami((err, data) => {
            if (err) return reject(err)
            resolve(data.id)
          })
        })
      }
    }
  }

  const apollo = new ApolloServer({
    typeDefs,
    context,
    resolvers
  })

  apollo.listen()
    .then(({ url }) => {
      console.log(`Server ready at ${url}`)
    })
})
