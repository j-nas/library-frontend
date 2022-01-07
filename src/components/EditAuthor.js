import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'

export default function EditAuthor({ isVisible, setErrorMessage }) {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [yearOfBirth, setYearOfBirth] = useState("");

  const options = useQuery(ALL_AUTHORS).data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }));
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  });
  const submit = async (event) => {
    event.preventDefault();
    await editAuthor({ variables: { 
      name: selectedAuthor.value, 
      setBornTo: parseInt(yearOfBirth, 10)
    } });
    setSelectedAuthor(null);
    setYearOfBirth("");
  }


  if (!isVisible) {
    return null;
  }
  return (
    <div>
      <h1>
        {!selectedAuthor 
          ? "Select author" 
          : `Edit author: ${selectedAuthor.value}`
        }
      </h1>

      <Select
        value={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
      <br />
      <div>
        {selectedAuthor && (
          <>
            <form onSubmit={submit}>
              Year of birth:
              <input
                value={yearOfBirth}
                onChange={({ target }) => setYearOfBirth(target.value)}
              />
            <button type="submit">Update author</button>
            </form>
          </>
        )}



        
      </div>
    </div>
  )
}
