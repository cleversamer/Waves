const { json } = require("express");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

module.exports = (app) => {
  app.use(json());
  app.use(xss());
  app.use(mongoSanitize());
};
