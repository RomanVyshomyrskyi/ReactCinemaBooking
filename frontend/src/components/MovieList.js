import React, { useEffect, useState } from "react";
import { getMovies } from "../api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#0d1b2a", color: "#fff", fontFamily: "Grenze, serif" }}
    >
      <h2 style={{ color: "#d7263d" }} className="mb-4">
        Available Movies
      </h2>
      <ul className="list-group">
        {movies.map((movie) => (
          <li
            key={movie._id}
            className="list-group-item mb-3"
            style={{
              backgroundColor: "#09122C",
              color: "#E17564",
              border: "1px solid #d7263d",
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          >
            <h4 style={{ color: "#BE3144" }}>{movie.title}</h4>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;