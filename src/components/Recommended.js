import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";




export default function Recommended({ show, token }) {
  
  console.log('token', token)
  
  const [getCurrentUser, currentUser] = useLazyQuery(CURRENT_USER, {
    onCompleted: (data) => {
      getBooks(data)
    }
  });

  const {  // assign default property to current user, so if user is not logged
    data: { // in it will not throw an error
      me: { favoriteGenre },
    } = { me: { favoriteGenre: null } },
  } = currentUser;


  const [getBooks, booksByGenre] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre } 
  });
  useEffect(() => {
    
    
    if (token) {
      getCurrentUser()
    }
  }, [getBooks, getCurrentUser, token])

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