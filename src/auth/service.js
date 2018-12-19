import { config } from "./config";
import * as Auth0 from "auth0-js";

export default class Auth {
  auth0 = new Auth0.WebAuth({
    domain: config.domain,
    clientID: config.clientId,
    redirectUri: config.redirect,
    audience: config.audience,
    responseType: "id_token token",
    scope: "openid profile email"
  });

  // constructor() {
  //   this.login = this.login.bind(this);
  //   this.logout = this.logout.bind(this);
  //   this.isAuthenticated = this.isAuthenticated.bind(this);
  //   this.getAccessToken = this.getAccessToken.bind(this);
  // }

  loginCallback = () => {};
  logoutCallback = () => {};

  userProfile = null;
  authFlag = "isLoggedIn";
  authStatus = this.isAuthenticated
    ? "init_with_auth_flag"
    : "init_no_auth_flag";
  idToken = null;
  idTokenPayload = null;
  accessToken;

  localLogin(authResult) {
    localStorage.setItem(this.authFlag, true);
    this.idToken = authResult.idToken;
    this.userProfile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;
    this.loginCallback({ loggedIn: true });
    // this.getAccessToken({ accessToken: authResult.accessToken });
  }

  localLogout() {
    localStorage.removeItem(this.authFlag);
    this.userProfile = null;

    this.logoutCallback({ loggedIn: false });
  }

  setAuthStatus() {
    this.authStatus = "";
  }

  getAccessToken() {
    return this.accessToken;
  }

  renewAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          console.log(err);
          this.localLogout();

          return reject(err);
        }

        this.localLogin(authResult);
        return resolve(authResult);
      });
    });
  };

  login() {
    this.auth0.popup.authorize({}, (err, authResult) => {
      console.log(err, authResult);
      if (err) this.localLogout();
      else {
        this.localLogin(authResult);
        this.getAccessToken(authResult);
        this.accessToken = authResult.accessToken;
      }
    });
  }

  isAuthenticated() {
    return localStorage.getItem(this.authFlag) === "true";
  }

  // checkLogin() {
  //   // check to see if a user is authenticated, we'll get a token back
  //   this.get("auth0").checkSession({}, (err, authResult) => {
  //     // if we are wrong, stop everything now
  //     if (err) return err;
  //     this.localLogin();
  //     this.setUser(authResult.accessToken);
  //     this.accessToken = authResult.accessToken;
  //   });
  // }

  logout() {
    this.localLogout();
    this.auth0.logout({
      returnTo: config.logoutUrl,
      clientID: config.clientId
    });
  }
}
