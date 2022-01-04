
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const logout = () => {
    setToken(null)
    setErrorMessage(null)
    localStorage.clear()
  }
  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
      }
    }, [])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      setErrorMessage(null)
      }
    }, [errorMessage])
    
  return (
    <div>
      <ToastContainer position="top-center" />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add books</button>}
        {!token 
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>logout</button>
        }
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
      <LoginForm
        show={page === 'login'}
        setErrorMessage={setErrorMessage}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App