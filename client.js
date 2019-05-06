const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { createHttpLink } = require('apollo-link-http')
const gql = require('graphql-tag').default
const yo = require('yo-yo')

// set up client connection
const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
})

// view elements
const view = yo`
  <h1>Loading...</h1>
`
view.update = function (data) {
  const results = yo`
    <div>
      <p>Here's your data!</p>
      <pre><code>
${JSON.stringify(data, null, 2)}
      </code></pre>
    </div>
  `
  yo.update(this, results)
}
document.body.appendChild(view)

// run query, then update views
const query = gql`
  {
    me {
      id
      name
    }
    getPeer(id: "@9aHOVuS5Y8/BOQRnQeuvqcycgKwrW7SXQEzPsV6pI10=.ed25519") {
      id
      name
      follows {
        name
      }
    }
  }
`
client.query({ query })
  .then(res => view.update(res.data))
