const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers");
const { addProductValidator } = require("../middleware/validation");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    [auth("createAny", "product"), addProductValidator],
    productsController.addProduct
  );

module.exports = router;
