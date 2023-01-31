import React, {useState, useEffect} from 'react'
import axios from 'axios'

const PokemonCard = ({pokemon, filterValue}) => {
  const [pokemonData, setPokemonData] = useState({})
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then(response => {
        setPokemonData(response.data)
        setPokemonTypes(response.data.types)
        setError(null)
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
  }, [])

  const typeColors = {
    normal: 'normal',
    fighting: 'fighting',
    flying: 'flying',
    poison: 'poison',
    ground: 'ground',
    rock: 'rock',
    bug: 'bug',
    ghost: 'ghost',
    steel: 'steel',
    fire: 'fire',
    water: 'water',
    grass: 'grass',
    electric: 'electric',
    psychic: 'psychic',
    ice: 'ice',
    dragon: 'dragon',
    dark: 'dark',
    fairy: 'fairy'
  }

  return (
    <div className={`card ${pokemonTypes.map(type => typeColors[type.type.name]).join(' ')}`}>
      <div className="card-img">
        {pokemonData.sprites && (
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        )}
      </div>
      <div className="card-info">
        <h2>{pokemonData.name}</h2>
          <p>{pokemonTypes.map(type => type.type.name).join(', ')}</p>
          <p>{pokemonData.weight} lbs</p>
          <p>{pokemonData.height} ft</p>
      </div>
    </div>
  )
}

export default PokemonCard