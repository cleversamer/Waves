const config = require("../config.json");
const mongoose = require("mongoose");

module.exports = () => {
  const mongoURI = process.env["MONGODB_URI"] || config.mongoURI;
  mongoose
    .connect(mongoURI)
    .then((value) => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB: ${err.message}`);
    });
};
