const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers");
const auth = require("../middleware/auth");

module.exports = router;
