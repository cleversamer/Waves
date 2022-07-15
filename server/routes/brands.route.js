const { Router } = require("express");
const router = Router();
const { brandsController } = require("../controllers");
const auth = require("../middleware/auth");

router.post("/", [auth("createAny", "brand")], brandsController.addBrand);

module.exports = router;
