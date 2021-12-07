import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider 
} from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: 'http://localhost:4000/graphql',
    connectToDevTools: true 
  }),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>,
  document.getElementById('root')
)