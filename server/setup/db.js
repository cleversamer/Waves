const config = require("../config.json");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(config.mongoURI)
    .then((value) => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB: ${err.message}`);
    });
};
