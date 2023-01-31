import React from 'react'

const PokemonModal = ({pokemon, onClose}) => {
  return (
    <div className="pokemon-modal-overlay">
      <div className="pokemon-modal">
        <div className="pokemon-modal-header">
          <h2>{pokemon.name}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="pokemon-modal-body">
          {/* Display detailed information of the Pokemon here */}
        </div>
      </div>
    </div>
  )
}

export default PokemonModal