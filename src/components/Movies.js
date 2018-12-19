import React, { useState, useEffect } from "react";
import "./styles.css";
import "./TvShows";
import TvShows from "./TvShows";
import auth from "../auth/service";

// const getMovies = () => Promise.resolve(moviesData);

function Movies() {
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   auth
  //     .renewAuthentication()
  //     .then(auth =>
  //       fetch("http://localhost:3005/api/data/movies", {
  //         headers: { Authorization: `Bearer ${auth.token}` }
  //       })
  //     )
  //     .then(resp => resp.json())
  //     .then(setMovies);
  // }, []);
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   auth
  //     .getAccessToken()
  //     .then(token =>
  //       fetch("http://localhost:3005/api/data/movies", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //     )
  //     .then(resp => resp.json())
  //     .then(setMovies);
  // }, []);

  // useEffect(() => {
  //   const { getAccessToken } = this.props.auth;

  //   auth
  //     .getAccessToken()
  //     .then(auth =>
  //       fetch("http://localhost:3005/api/data/movies", {
  //         headers: { Authorization: `Bearer ${auth.getAccessToken()}` }
  //       })
  //     )
  //     .then(resp => resp.json())
  //     .then(setMovies);
  // }, []);

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
