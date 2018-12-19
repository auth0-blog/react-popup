"use strict";

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Config route
const config = require("../api/config");

// Setting up the app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("../api/routes")(app, config);

//---- Serve
const PORT = 3005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
