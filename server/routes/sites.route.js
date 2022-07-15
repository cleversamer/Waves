const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const { sitesController } = require("../controllers");

router
  .route("/")
  .get(sitesController.getAllSiteArgs)
  .post([auth("createAny", "site")], sitesController.addSiteArgs);

router
  .route("/:id")
  .get(sitesController.getSite)
  .patch([auth("updateAny", "site")], sitesController.updateSite);

module.exports = router;
