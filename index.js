const ScuttlebuttClient = require('ssb-client')
const Config = require('ssb-config/inject')
const Apollo = require('./apollo/server')

const config = Config('ssb', {})

ScuttlebuttClient(config.keys, config, (err, ssbServer) => {
  if (err) throw err

  Apollo(ssbServer)
})
