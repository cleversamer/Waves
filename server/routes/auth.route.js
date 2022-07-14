const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");

router.get("/hello", authController.hello);

module.exports = router;
