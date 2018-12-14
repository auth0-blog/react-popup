const showsJson = require("./data/tvShows.json");
const moviesJson = require("./data/movies.json");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const path = require("path");

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

  if (process.env.NODE_ENV !== "dev") {
    // @TODO: should this be / or *? And why? Is this completely unnecessary in React?
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../build/index.html"));
    });
  }

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

  app.get("/api/data/tvshows", (req, res) => {
    setTimeout(() => {
      res.json(allShows);
    }, delay());
  });

  app.get("/api/data/movies", (req, res) => {
    setTimeout(() => {
      res.json(allMovies);
    }, delay());
  });
};
