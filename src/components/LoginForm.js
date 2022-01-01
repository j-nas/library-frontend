import React, {useState} from 'react'

export default function LoginForm({ token, setToken}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  if (token) {
    return (
      <div>
        <h2>{`{userNameHere}`} is currently logged in</h2>
        User is currently logged in<br/>
        <button>logout</button>
      </div>

    )
  }

  return (
    <div>
      <h2>login</h2>
      <form>
        <input type="text" /> <br />
        <input type="password" /> <br />
        <button type="submit">login</button>
      </form>
    </div>
  )      
}
