import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'
import { arrowFunctionExpression } from "@babel/types";

export default function EditAuthor({ isVisible }) {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [yearOfBirth, setYearOfBirth] = useState("");

  const options = useQuery(ALL_AUTHORS).data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }));
  
  const updateAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });


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
            <label>
              Year of birth:
              <input
                value={yearOfBirth}
                onChange={({ target }) => setYearOfBirth(target.value)}
              />
            </label>
            <button onClick={() => updateAuthor()}>Update author</button>
          </>
        )}



        
      </div>
    </div>
  )
}
