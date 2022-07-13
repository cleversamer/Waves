const setupSanitization = require("./sanitize");
const setupMongoDB = require("./db");

module.exports = (app) => {
  setupSanitization(app);
  setupMongoDB();
};
