const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    me: Peer

    getPeer(id: String): Peer
  }

  type Peer {
    id: String
    name: String
    seq: Int,
    follows: [Peer]
  }
`

module.exports = typeDefs
