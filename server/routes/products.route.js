const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(auth("createAny", "product"), productsController.addProduct);

module.exports = router;
