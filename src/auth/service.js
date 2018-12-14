import { config } from "./config";
import * as Auth0 from "auth0-js";

export default class Auth {
  auth0 = new Auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId,
    redirectUri: config.redirect,
    responseType: "id_token",
    scope: "openid profile email"
  });

  loginCallback = () => {};
  logoutCallback = () => {};

  authFlag = "isLoggedIn";
  authStatus = this.isAuthenticated
    ? "init_with_auth_flag"
    : "init_no_auth_flag";
  idToken = null;
  idTokenPayload = null;

  localLogin(authResult) {
    localStorage.setItem(this.authFlag, true);
    this.idToken = authResult.idToken;
    this.idTokenPayload = authResult.idTokenPayload;
    console.log(authResult.idToken, "id token");
    console.log(authResult.idTokenPayload, "profile");

    this.loginCallback({ loggedIn: true });
  }

  localLogout() {
    localStorage.removeItem(this.authFlag);
    this.userProfile = null;

    this.logoutCallback({ loggedIn: false });
  }

  setAuthStatus() {
    this.authStatus = "";
  }

  login() {
    this.auth0.popup.authorize({}, (err, authResult) => {
      console.log(err, authResult);
      if (err) this.localLogout();
      else {
        this.localLogin(authResult);
      }
    });
  }

  isAuthenticated() {
    return localStorage.getItem(this.authFlag) === "true";
  }

  checkLogin() {
    // check to see if a user is authenticated, we'll get a token back
    this.get("auth0").checkSession({}, (err, authResult) => {
      // if we are wrong, stop everything now
      if (err) return err;
      this.localLogin();
      this.setUser(authResult.accessToken);
    });
  }

  logout() {
    this.localLogout();
    this.auth0.logout({
      returnTo: config.logoutUrl,
      clientID: config.clientId
    });
  }
}
