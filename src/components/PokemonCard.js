// PokemonCard.js
import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
  );
};

export default PokemonCard;
