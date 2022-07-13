require("dotenv").config();
const config = require("./config.json");
const setup = require("./setup");
const express = require("express");
const app = express();

setup(app);

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`App is listening on port ${config.port}`);
});
