// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return details.data;
          })
        );
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData); // Set initially filtered list
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  // Debounce for search optimization
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterPokemon(value, typeFilter);
  };

  const handleTypeFilter = (e) => {
    const value = e.target.value;
    setTypeFilter(value);
    filterPokemon(searchTerm, value);
  };

  const filterPokemon = (searchTerm, typeFilter) => {
    let filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    if (typeFilter !== 'all') {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === typeFilter)
      );
    }

    setFilteredPokemon(filtered);
  };

  const debouncedSearch = debounce(handleSearch, 300);

  // Handle selecting a Pokémon card for detailed view
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Close details when clicking outside or on close button
  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="app">
      <h1 className="app-title">PokéScope</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={debouncedSearch}
        />
        <select onChange={handleTypeFilter} value={typeFilter}>
          <option value="all">All Types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="dragon">Dragon</option>
          {/* Add more types here */}
        </select>
      </div>

      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => handleCardClick(pokemon)} // Handle card click
          />
        ))}
      </div>

      {/* Show detailed view for selected Pokémon */}
      {selectedPokemon && (
        <div className="pokemon-details-overlay" onClick={handleCloseDetails}>
          <div className="pokemon-details" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseDetails}>X</button>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>Types: {selectedPokemon.types.map((type) => type.type.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;