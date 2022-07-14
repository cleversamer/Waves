const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/isauth", authController.isAuth);

module.exports = router;
