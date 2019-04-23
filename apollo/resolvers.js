module.exports = {
  Query: {
    whoami,
    me
  }
}

function whoami (_, __, context) {
  return new Promise((resolve, reject) => {
    context.ssb.whoami((err, data) => {
      if (err) return reject(err)
      resolve(data.id)
    })
  })
}

function me (_, __, context) {
  return {
    id: context.ssb.id,
    name: 'mixmix'
  }
}
