import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import TvShows from "./components/TvShows.js";
import Movies from "./components/Movies.js";
import auth from "./auth/service";

class App extends Component {
  constructor(props) {
    super(props);

    auth.loginCallback = this.loggedIn.bind(this);
    auth.logoutCallback = this.loggedOut.bind(this);

    this.state = {loggedIn: false};
  }

  loggedIn() {
    this.setState({loggedIn: true});

    const {history} = this.props;
    history.push("/movies");
  }

  loggedOut() {
    this.setState({loggedIn: false});

    const {history} = this.props;
    history.push("/");
  }

  render() {
    return (
      <div>
        <Route component={TvShows} exact path="/" />
        <Route component={Movies} exact path="/movies" />
        {this.state.loggedIn ? (
          <button onClick={() => auth.logout()} className="log-in">
            Log Out
          </button>
        ) : (
          <button onClick={() => auth.login()} className="log-in">
            Log In
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(App);
