const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");
const auth = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/isauth", [auth()], authController.isAuth);

module.exports = router;
