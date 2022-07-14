const { Router } = require("express");
const router = Router();
const { usersController } = require("../controllers");
const auth = require("../middleware/auth");

router
  .route("/profile")
  .get([auth("readOwn", "profile")], usersController.profile)
  .patch([auth("updateOwn", "profile")], usersController.updateProfile);

router.patch(
  "/email",
  [auth("updateOwn", "email")],
  usersController.updateEmail
);

module.exports = router;
