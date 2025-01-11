import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col md:flex-row items-center gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
