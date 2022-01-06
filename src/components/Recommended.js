import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, CURRENT_USER } from "../queries";




export default function Recommended(props) {
  
  const [genre, setGenre] = useState(null);
  const currentUser = useQuery(CURRENT_USER);
  const booksByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genre }
  });

  useEffect(() => {
    if (currentUser.data) {
      setGenre(currentUser.data.me.favoriteGenre);
    }
  }, [currentUser.data])


  if (!props.show) return null;
  if (currentUser.loading || booksByGenre.loading) return <div>loading...</div>;
  if (currentUser.error || booksByGenre.error) return <div>error</div>
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