const { json } = require("express");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

module.exports = (app) => {
  app.use(json());
  app.use(cors({ origin: true }));
  app.use(xss());
  app.use(mongoSanitize());
};
