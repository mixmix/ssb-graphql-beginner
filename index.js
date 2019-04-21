const Client = require('ssb-client')
const Config = require('ssb-config/inject')
const Apollo = require('./apollo')

const config = Config('ssb', {})

Client(config.keys, config, (err, ssbServer) => {
  if (err) throw err

  Apollo(ssbServer)
})
