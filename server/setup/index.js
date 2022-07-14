const setupSanitization = require("./sanitize");
const setupMongoDB = require("./db");
const routes = require("../routes");
const config = require("../config.json");
const { errorHandler, errorConverter } = require("../middleware/apiError");

module.exports = (app) => {
  setupSanitization(app);
  setupMongoDB();
  app.use("/api", routes);
  app.use(errorConverter);
  app.use(errorHandler);

  const PORT = process.env.PORT || config.development.port;
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
};
