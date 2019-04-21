module.exports = {
  Query: {
    hello: () => 'hello worlds!',
    whoami
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
