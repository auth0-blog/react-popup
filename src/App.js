import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import TvShows from "./components/TvShows.js";
import Movies from "./components/Movies.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route component={TvShows} path="/" exact />
          <Route component={Movies} path="/movies" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
