import React, { Component } from "react";
import "./components/styles.css";
import TvShows from "./components/TvShows.js";
import Movies from "./components/Movies.js";
import auth from "./auth/service";

class App extends Component {
  constructor(props) {
    super(props);

    auth.loginCallback = this.loggedIn.bind(this);
    auth.logoutCallback = this.loggedOut.bind(this);

    this.state = { loggedIn: false };
  }

  loggedIn() {
    this.setState({ loggedIn: true });
  }

  loggedOut() {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <Movies /> : <TvShows />}
        {this.state.loggedIn ? (
          <button onClick={() => auth.logout()} className="log-button">
            Log Out
          </button>
        ) : (
            <button onClick={() => auth.login()} className="log-button">
              Log In
          </button>
          )}
      </div>
    );
  }
}

export default App;
