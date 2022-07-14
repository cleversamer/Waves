const setupSanitization = require("./sanitize");
const setupMongoDB = require("./db");
const routes = require("../routes");
const config = require("../config.json");

module.exports = (app) => {
  setupSanitization(app);
  setupMongoDB();
  app.use("/api", routes);

  const PORT = process.env.PORT || config.port;
  app.listen(PORT, () => {
    console.log(`App is listening on port ${config.port}`);
  });
};
