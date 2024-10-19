import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <img
        className="w-64 h-64 mx-auto mt-4"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="p-4 text-center">
        <h2 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h2>
        <div className="flex justify-center mb-4">
          {pokemon.types.map((typeInfo, index) => (
            <span
              key={index}
              className="bg-gray-200 px-4 py-1 rounded-lg text-sm font-medium capitalize mr-2"
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <p className="text-lg font-medium mb-4">Height: {pokemon.height / 10} m</p>
        <p className="text-lg font-medium mb-4">Weight: {pokemon.weight / 10} kg</p>
        <h3 className="text-2xl font-bold mb-4">Stats</h3>
        <ul className="list-disc list-inside text-left">
          {pokemon.stats.map((stat, index) => (
            <li key={index} className="text-lg">
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
