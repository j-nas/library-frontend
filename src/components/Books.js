import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
const Books = (props) => {
  const [ genreFilter, setGenreFilter ] = useState(null)
  
  const books = useQuery(ALL_BOOKS)
  const { loading, error, data } = books
  if (!props.show) return null
  if (loading) return <div>loading...</div>
  if (error) return <div>error</div>
  
  const genreList = [...new Set(data.allBooks.reduce((acc, book) => {
    return [...acc, ...book.genres]
    }, []))
  ]
  
  return (
    <div>
      <h2>books</h2>
      <div>
        {!genreFilter 
          ? <p>in <strong>all</strong> genres</p> 
          : <p>in genre <strong>{genreFilter}</strong></p>
        }
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks
            .filter(genre => {
              if (!genreFilter) return true
              return genre.genres.includes(genreFilter)
            })
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      <br />
      {genreList.map(g =>
        <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
      )}
      <button onClick={() => setGenreFilter(null)}>all genres</button>
    </div>
  )
}

export default Books