import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import Search from './components/Search';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    // Fetch Pokémon data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const results = response.data.results;
        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return pokemonData.data;
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle search input and filtering
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPokemons(filtered);
  };

  // Handle type filter
  const handleTypeFilter = (e) => {
    const type = e.target.value;
    setTypeFilter(type);
    if (type === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === type)
      );
      setFilteredPokemons(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Pokémon Search & Filter</h1>
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="mb-4">
        <label className="text-lg font-medium mr-4">Filter by Type:</label>
        <select
          className="border border-gray-300 p-2 rounded-lg"
          value={typeFilter}
          onChange={handleTypeFilter}
        >
          <option value="">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;
