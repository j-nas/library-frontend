import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      id
      bookCount
      born  
    }
  }
`
export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      published
      author {
        name
      }
      genres
        
      
    }
  }
`      

export const CURRENT_USER = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`



