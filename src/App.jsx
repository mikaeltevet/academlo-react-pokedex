import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector, Provider} from 'react-redux'
import {updateUsername} from './redux/usernameActions'
import Pokedex from './Pokedex'
import './App.css'
import pokelogo from './assets/pokelogo.svg'

const Form = ({username, handleChange, handleSubmit}) => (
  <div className="welcome">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="Enter your name, coach!"
      />
      <button type="submit">Go!</button>
    </form>
  </div>
)

const App = () => {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const storedUsername = useSelector((state) => state.username)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [storedUsername])

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUsername(username))
  }

  return (
    <body className={darkMode ? 'dark-mode' : ''}>
      <div className="pokedex">
        <img src={pokelogo} className="logo" />
        <h1>Welcome to the Pok&eacute;dex!</h1>
        {!storedUsername && <Form username={username} handleChange={handleChange} handleSubmit={handleSubmit} />}
        {!darkMode
          ? <button onClick={() => setDarkMode(!darkMode)}>&#127769;</button>
          : <button onClick={() => setDarkMode(!darkMode)}>&#128262;</button>
        }
        {storedUsername && <Pokedex />}
      </div>
    </body>
  )
}

export default App