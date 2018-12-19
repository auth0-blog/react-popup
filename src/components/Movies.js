import React, { useState, useEffect } from "react";
import "./styles.css";
import "./TvShows";
import TvShows from "./TvShows";
import auth from "../auth/service";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/api/data/movies", {
      headers: {
        Authorization: `Bearer ${auth.getAccessToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });
  }, []);

  return (
    <div>
      <h1>MOVIES</h1>
      {movies.map(movies => (
        <div key={movies.id} className="card">
          <h3>{movies.name}</h3>
          <h5>{movies.airDate}</h5>
        </div>
      ))}
      <TvShows />
    </div>
  );
}

export default Movies;
