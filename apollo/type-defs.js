const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "a simple string to get started!"
    hello: String,
    whoami: String
  }
`

module.exports = typeDefs
