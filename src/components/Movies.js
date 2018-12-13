import React, { useState, useEffect } from "react";
import Auth from "../auth/service";
import "./styles.css";

function Movies() {
  const [movies, setMovies] = useState([]);

  const auth = new Auth();

  useEffect(() => {
    fetch("/api/data/movies")
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });
  }, []); // empty array because we only run once

  return (
    <div>
      <h1>MOVIES</h1>
      {movies.map(movies => (
        <div key={movies.id} className="card">
          <h3>{movies.name}</h3>
          <h5>{movies.airDate}</h5>
        </div>
      ))}

      <button onClick={() => auth.logout()} className="log-in">
        Log Out
      </button>
    </div>
  );
}

export default Movies;
