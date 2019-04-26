const ScuttlebuttClient = require('ssb-client')
const Config = require('ssb-config/inject')
const Apollo = require('./apollo')

const config = Config('ssb', {})

ScuttlebuttClient(config.keys, config, (err, ssbServer) => {
  if (err) throw err

  // start apollo server
  const apollo = Apollo(ssbServer)
})
