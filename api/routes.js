const showsJson = require("./data/tvShows.json");
const moviesJson = require("./data/movies.json");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const delay = () => Math.random() * 2500;

module.exports = function(app, config) {
  const authCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: [config.CLIENT_ID],
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: "RS256"
  });

  //   if (process.env.NODE_ENV !== "dev") {
  //     app.get("*", (req, res) => {
  //       res.sendFile(
  //         path.join(__dirname, "/build/auth0/index.html")
  //       );
  //     });
  //   }

  const allShows = showsJson.map(show => {
    return {
      id: show.id,
      name: show.name,
      airDate: show.airDate,
      lastShowDate: show.lastShowDate,
      aCastMember: show.aCastMember,
      totalSeasons: show.totalSeasons,
      totalEpisodes: show.totalEpisodes,
      interestingFact: show.interestingFact
    };
  });

  const allMovies = moviesJson.map(movie => {
    return {
      id: movie.id,
      name: movie.name,
      airDate: movie.airDate,
      aCastMember: movie.aCastMember,
      interestingFact: movie.interestingFact
    };
  });

  // ------------- GET -----------------
  app.get("/api/", (req, res) => {
    res.send("API is working");
  });

  app.get("/api/public", (req, res) => {
    setTimeout(() => {
      res.json(showsJson);
    }, delay());
  });

  app.get("/api/secure", authCheck, (req, res) => {
    setTimeout(() => {
      res.json(moviesJson);
    }, delay());
  });

  app.get("/api/data/tvshows", (req, res) => {
    res.json(allShows);
  });

  app.get("/api/data/movies", (req, res) => {
    res.json(allMovies);
  });

  app.get("/close-popup", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/close-popup/index.html"));
  });

  app.get("/api/data/tvshows/:id", (req, res) => {
    const id = req.params.id * 1;
    const thisShow = showsJson.find(show => show.id === id);
    res.json(thisShow);
  });
};
