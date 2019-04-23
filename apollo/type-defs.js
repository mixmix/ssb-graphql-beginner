const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    whoami: String
    me: User
  }

  type User {
    id: String
    name: String
    seq: String
  }
`

module.exports = typeDefs
