import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import {useSelector} from 'react-redux'

const Pokedex = () => {
  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [elementsPerPage, setElementsPerPage] = useState(12)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState(null)
  const [selectedType, setSelectedType] = useState('')
  const [types, setTypes] = useState([])

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${currentPage * elementsPerPage}&limit=${elementsPerPage}${selectedType ? `&type=${selectedType}` : ''}/`)
      .then(response => {
        setPokemon(response.data.results)
        setTotalPages(Math.ceil(response.data.count / elementsPerPage))
        setError(null)
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
  }, [currentPage, elementsPerPage, selectedType])

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/`)
      .then(response => {
        setTypes(response.data.results)
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
  }, [])  

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  const handleElementsPerPageChange = event => {
    setElementsPerPage(event.target.value)
  }

  const handleTypeChange = event => {
    setSelectedType(event.target.value)
    setCurrentPage(0)
  }

  const renderPageNumbers = () => {
    if (totalPages <= 1) {
      return null
    }

    const start =
      currentPage - 2 <= 0
        ? 0
        : currentPage + 2 >= totalPages
        ? totalPages - 5
        : currentPage - 2
    const end =
      currentPage <= 2
        ? 4
        : currentPage + 2 >= totalPages
        ? totalPages - 1
        : currentPage + 2
    const pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    return (
      <>
        <button disabled={currentPage === 0} onClick={() => handlePageChange(0)}>
          First
        </button>
        <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        {pageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            className={currentPage === pageNumber ? 'active' : ''}
          >
          {pageNumber + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
        >
          Last
        </button>
      </>
    )
  }

  const username = useSelector((state) => state.username)

  return (
    <div className="pokedex">
      {error ? (
        <div>An error occurred: {error.message}</div>
      ) : (
        <>
          <div className="hey">
            <h1>Hey, {username}!</h1><h2>Here you'll find your favorite Pok&eacute;mon.</h2>
          </div>
          <div className="elements-per-page">
            <label>Pok&eacute;mon per page: </label>
            <select onChange={handleElementsPerPageChange}>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12} selected>12</option>
              <option value={16}>16</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="type-filter">
            <label htmlFor="type-filter">Type: </label>
            <select id="type-filter" value={selectedType} onChange={handleTypeChange}>
              <option value="">All</option>
              {types.map(type => (
                <option key={type.name} value={type.name}>
                    {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="card-grid">
            {pokemon.map(p => (
              <PokemonCard key={p.name} pokemon={p} />
            ))}
          </div>
          <div className="pagination">
            {renderPageNumbers()}
          </div>
        </>
      )}
    </div>
  )
}

export default Pokedex