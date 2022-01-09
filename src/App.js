
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './subscriptions'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data
      toast(
        `${bookAdded.title}, written by ${bookAdded.author.name} added`
      )
    }
  })
  const logout = () => {
    setToken(null)
    setErrorMessage(null)
    setPage('authors')
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
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {!token 
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={logout}>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        setErrorMessage={setErrorMessage}
      />

      <Books
        show={page === 'books'}
        token={token}
        setErrorMessage={setErrorMessage}
      />

      <NewBook
        show={page === 'add'}
        token={token}
        setErrorMessage={setErrorMessage}
      />
      <LoginForm
        show={page === 'login'}
        setErrorMessage={setErrorMessage}
        setToken={setToken}
        setPage={setPage}
      />
      <Recommended
        show={page === 'recommended'}
        token={token}
      />

    </div>
  )
}

export default App