import environment from "./../../environments/environments";

export default Auth({
  auth0: computed(function() {
    return new auth0.WebAuth({
      domain: environment.auth.domain, // domain from auth0
      clientID: environment.auth.clientId, // clientId from auth0
      redirectUri: environment.auth.popupRedirect,
      responseType: "id_token",
      scope: "openid profile email" // adding profile because we want username, given_name, etc
    });
  }),
  /**
   * Send a user over to the hosted auth0 login page
   */
  login() {
    this.get("auth0").authorize();
  },

  /**
   * When a user lands back on our application
   * Parse the hash and store user info
   */
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
  },

  /**
   * Computed to tell if a user is logged in or not
   * @return boolean
   */
  isAuthenticated: computed(function() {
    return this.get("checkLogin");
  }),

  /**
   * Use the token to set our user
   */
  setUser(token) {
    // once we have a token, we are able to go get the users information
    this.get("auth0").client.userInfo(token, (err, profile) =>
      this.set("user", profile)
    );
  },

  /**
   * Check if we are authenticated using the auth0 library's checkSession
   */
  checkLogin() {
    // check to see if a user is authenticated, we'll get a token back
    this.get("auth0").checkSession({}, (err, authResult) => {
      // if we are wrong, stop everything now
      if (err) return err;
      this.setUser(authResult.accessToken);
    });
  },

  /**
   * Get rid of everything in sessionStorage that identifies this user
   */
  logout() {
    this.get("auth0").logout({
      clientID: environment.auth.clientId,
      returnTo: "http://localhost:4200"
    });
  }
});
