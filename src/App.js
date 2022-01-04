
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  if (!token) {
    return (
      <LoginForm 
        setToken={setToken} 
        setErrorMessage={setErrorMessage}
      />
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        setToken={setToken}
      />

      <Books
        show={page === 'books'}
        token={token}
      />

      <NewBook
        show={page === 'add'}
        token={token}
      />
      

    </div>
  )
}

export default App