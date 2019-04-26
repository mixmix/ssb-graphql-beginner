const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { createHttpLink } = require('apollo-link-http')
const gql = require('graphql-tag').default
const yo = require('yo-yo')

// view elements
const el = yo`
  <h1>Loading...</h1>
`
document.body.appendChild(el)
function update (data) {
  const results = yo`
    <div>
      <p>Here's your data!</p>
      <pre><code>
${JSON.stringify(data, null, 2)}
      </code></pre>
    </div>
  `
  yo.update(el, results)
}

// set up client connection
const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
})

// run query, then update views
const query = gql`
  {
    me {
      id
      name
    }
  }
`
client.query({ query })
  .then(res => update(res.data))
