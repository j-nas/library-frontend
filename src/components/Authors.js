  
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditAuthor from './EditAuthor'

const Authors = ({ show, setErrorMessage }) => {
  const [showEdit, setShowEdit] = useState(false)

  const authors = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  console.log(authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => setShowEdit(!showEdit)}>Edit authors</button>
      <EditAuthor isVisible={showEdit} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default Authors
