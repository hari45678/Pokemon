import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md">
      <img
        className="w-32 h-32 mx-auto"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h2 className="text-center text-xl font-bold capitalize mt-2">{pokemon.name}</h2>
      <div className="text-center">
        {pokemon.types.map((typeInfo, index) => (
          <span
            key={index}
            className="bg-gray-200 px-2 py-1 rounded-lg text-sm font-medium capitalize mr-2"
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
