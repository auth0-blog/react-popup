import React, { useState, useEffect } from "react";
// import { BrowserRouter as Route } from "react-router-dom";
// import TvShows from "./components/TvShows";
// import Movies from "./components/Movies";
// import axios from "axios";
import Auth from "./auth/service.js";

function App() {
  // useEffect(() => {
  //   axios.get(`/api/data/tvshows/:id`).then(response => {
  //     this.setState({
  //       tvshows: response.data
  //     });
  //   });
  // });
  // return (
  //   <div>
  //     <Route exact path="/" component={TvShows} />
  //     <Route path="/secure/movies" component={Movies} />
  //   </div>
  // );

  const [shows, setShows] = useState([]);

  const auth = new Auth();

  useEffect(() => {
    fetch(`http://localhost:3000/api/data/tvShows`)
      .then(response => response.json())
      .then(data => {
        setShows(data); // set users in state
      });
  }, []); // empty array because we only run once

  //   useEffect(() => {
  //     axios.get("/api/data/tvShows/").then(response => {
  //       this.setShows({
  //         tvShows: response.data
  //       });
  //     });
  //   });

  //   const tvShowsDisplayed = shows => {
  //     const tvShows = [...shows];
  //     setShows(tvShows);
  //   };

  return (
    <div>
      {shows.map(shows => (
        <div key={shows.id}>
          <h3>{shows.name}</h3>
          <h5>{shows.airDate}</h5>
        </div>
      ))}
      <button onClick={() => auth.login()}>hi there</button>
    </div>
  );
}

export default App;
