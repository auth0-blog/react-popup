import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

function TvShows() {
  const [shows, setShows] = useState([]);

  useEffect(id => {
    axios(`/api/data/tvShows/${id}`)
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
    <div className="section">
      {shows.map(shows => (
        <div key={shows.id} className="card">
          {/* <h5>{user.login}</h5> */}
          <h1>hi there</h1>
        </div>
      ))}
    </div>
  );
}

export default TvShows;
