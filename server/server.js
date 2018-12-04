"use strict";

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Config route
const config = require("../api/config");

// Setting up the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// if (process.env.NODE_ENV !== "dev") {
//   app.use(
//     "/",
//     express.static(path.join(__dirname, "../build/react-authentication"))
//   );
// }

app.get("/close-popup", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/close-popup/index.html"));
});

require("../api/routes")(app, config);

//---- Serve
const PORT = 3005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
