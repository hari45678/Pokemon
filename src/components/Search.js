import React, { useState, useEffect } from 'react';

const Search = ({ searchTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg w-full"
        placeholder="Search Pokémon..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
