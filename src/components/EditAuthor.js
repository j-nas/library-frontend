import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

export default function EditAuthor({ isVisible }) {
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const options = useQuery(ALL_AUTHORS).data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }));
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div>
      <h1>{`Edit author: ${selectedAuthor}`}</h1>

      <Select
        value={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
    </div>
  )
}
