import React, {useEffect, useState} from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";




export default function Recommended({ show, token }) {
 
  const [genre, setGenre] = useState(null);
  
  const currentUser = useQuery(CURRENT_USER,
    {
      onCompleted: (data) => {
        if (data.me) {
          setGenre(data.me.favoriteGenre);
        }
      }
    });
    const [getBooks, booksByGenre] = useLazyQuery(BOOKS_BY_GENRE, {
      variables: { genre },
    })
  
  useEffect(() => {
    
    if (genre) {
      getBooks()
    }
  }, [genre, getBooks])


  if (!show) return null;
  if (currentUser.loading || booksByGenre.loading) return <div>loading...</div>;
  if (currentUser.error || booksByGenre.error) return <div>error</div>
  console.log('books by genre', booksByGenre)
  return (
    <div>
      <h1>
        Recommendations
      </h1>
      <p>
        books in your favorite genre <strong>{currentUser.data.me.favoriteGenre}</strong>
      </p>
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
          {booksByGenre.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}