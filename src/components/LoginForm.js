import React, { useState, useEffect } from 'react'

import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { LOGIN } from '../mutations'
import { CURRENT_USER } from '../queries'

export default function LoginForm({ setErrorMessage, setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()
  const currentUser = useQuery(CURRENT_USER) 

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })
  console.log(currentUser)
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password }})
  }


  // if (currentUser.data.me) {  
  //   return (
  //     <div>
  //       <h2>{currentUser.data.me.username} is currently logged in</h2>
  //       User is currently logged in<br/>
  //       <button>logout</button>
  //     </div>
  //   )
  // }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        username 
        <input 
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)} 
          style={{marginLeft: 10}}

        /> <br />
        password 
        <input 
          type="password" 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          style={{marginLeft: 10}}
        /> <br />
        <button type="submit">login</button>
      </form>
    </div>
  )      
}
