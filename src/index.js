import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink), connectToDevTools: true 
})



ReactDOM.render(
  <ApolloProvider client={client}>
    <App /> 
  </ApolloProvider>,
  document.getElementById('root')
)