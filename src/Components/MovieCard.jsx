import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
        className="w-40 h-60 object-cover mb-4 rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800">{movie.Title}</h3>
      <p className="text-gray-500">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;

