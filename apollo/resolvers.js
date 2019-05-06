const pull = require('pull-stream')

module.exports = {
  Query: {
    me,
    getPeer
  },
  Peer: {
    id: (peer) => peer.id,
    name,
    seq,
    follows
  }
}

function me (_, __, context) {
  return { id: context.ssb.id }
}

function getPeer (parent, args, context) {
  return { id: args.id }
}

function name (peer, _, context) {
  // NOTE ssbp is promisified async methods!
  return context.ssbp.about.socialValue({
    key: 'name',
    dest: peer.id
  })
}

function seq (peer, _, context) {
  return context.ssbp.latestSequence(peer.id)
    .catch(err => {
      console.log(err)
      return null
    })
}

function follows (peer, _, context) {
  // const focus = peer.feedId
  // TODO figure out how to use ssb-friends to do this :(

  return new Promise((resolve, reject) => {
    pull(
      context.ssb.friends.hopStream({ live: false }),
      pull.collect((err, data) => {
        if (err) return reject(err)

        const graph = data[0]

        const follows = Object.keys(graph)
          .filter(feedId => graph[feedId] === 1)
          .map(feedId => ({ id: feedId }))

        resolve(follows)
      })
    )
  })
}
