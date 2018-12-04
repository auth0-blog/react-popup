import React, { useState, useEffect } from "react";
import Auth from "../auth/service";

function TvShows() {
  const [shows, setShows] = useState([]);

  const auth = new Auth();

  useEffect(() => {
    fetch("/api/data/tvShows")
      .then(response => response.json())
      .then(data => {
        setShows(data); // set users in state
      });
  }, []); // empty array because we only run once

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

export default TvShows;
