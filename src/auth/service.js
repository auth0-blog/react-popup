import { environment } from "./../environments/environments";
import * as auth0 from "auth0-js";
import { bindNodeCallback } from "rxjs";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: environment.auth.domain,
    clientID: environment.auth.clientId,
    redirectUri: environment.auth.popupRedirect,
    responseType: "id_token",
    scope: "openid profile email"
    // redirect: false
  });

  authFlag = "isLoggedIn";
  authStatus = this.isAuthenticated
    ? "init_with_auth_flag"
    : "init_no_auth_flag";
  logoutPath = "/";
  defaultSuccessPath = "/";
  popupAuth() {
    bindNodeCallback(this.Auth0.popup.authorize.bind(this.Auth0.popup));
  }

  login(navAccess) {
    this.auth0.authorize();
    if (!navAccess) {
      // If user clicked login button organically, store
      // path to redirect to after successful login
      this.setAuthRedirect(this.router.url);
    }
    this.setAuthStatus("popup_auth_open");
    this.popupAuth$({}).subscribe(
      authResult => this.localLogin(authResult, navAccess),
      err => this.handleError(err)
    );
  }

  handleAuthentication() {
    return new Promise(resolve => {
      this.get("auth0").parseHash((err, authResult) => {
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
        }

        return resolve();
      });
    });
  }

  isAuthenticated() {
    return this.get("checkLogin");
  }

  setUser(id_token) {
    // once we have a token, we are able to go get the users information
    this.get("auth0").client.userInfo(id_token, (err, profile) =>
      this.set("user", profile)
    );
  }

  checkLogin() {
    // check to see if a user is authenticated, we'll get a token back
    this.get("auth0").checkSession({}, (err, authResult) => {
      // if we are wrong, stop everything now
      if (err) return err;
      this.setUser(authResult.accessToken);
    });
  }

  logout() {
    this.get("auth0").logout({
      clientID: environment.auth.clientId,
      returnTo: "http://localhost:3000"
    });
  }
}
