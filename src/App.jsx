import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Components/SearchBar";
import MovieGrid from "./Components/MovieGrid";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";

const App = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // For debounce logic
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [query]);

  // Fetch movies when the debounced query changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null); // Clear error before making a new API call
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${debouncedQuery}`
        );
        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          setError(null); // Clear error when movies are successfully fetched
        } else {
          setMovies([]);
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movies. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">
        Movie-app
      </h1>
      <SearchBar query={query} setQuery={setQuery} onSearch={(e) => e.preventDefault()} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
};

export default App;
