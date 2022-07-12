const config = require("./config.json");
const express = require("express");
const app = express();

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`App is listening on port ${config.port}`);
});
