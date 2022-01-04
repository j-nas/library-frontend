import React, { useState, useEffect } from 'react'

import { useMutation } from '@apollo/client'
import { LOGIN } from '../mutations'

export default function LoginForm(
  { setErrorMessage, 
    setToken, 
    show,
    setPage 
  }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })
  

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setUsername('')
      setPassword('')
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password }})
  }


 
  if(!show) {
    return null
  }
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
