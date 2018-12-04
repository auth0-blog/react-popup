import React, { useState, useEffect } from "react";
// import Auth from "./auth/service.js";

function Movies() {
  const [movies, setMovies] = useState([]);

  //   const auth = new Auth();

  useEffect(() => {
    fetch("/api/data/movies")
      .then(response => response.json())
      .then(data => {
        setMovies(data); // set users in state
      });
  }, []); // empty array because we only run once

  return (
    <div>
      {movies.map(movies => (
        <div key={movies.id}>
          <h3>{movies.name}</h3>
          <h5>{movies.airDate}</h5>
          <h5>{movies.aCastMember}</h5>
        </div>
      ))}
    </div>
  );
}

export default Movies;
