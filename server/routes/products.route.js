const { Router } = require("express");
const router = Router();
const { productsController } = require("../controllers");
const { addProductValidator } = require("../middleware/validation/product");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    [auth("createAny", "product"), addProductValidator],
    productsController.addProduct
  );

router
  .route("/:id")
  .get(productsController.getProduct)
  .patch([auth("updateAny", "product")], productsController.updateProduct)
  .delete([auth("deleteAny", "product")], productsController.deleteProduct);

module.exports = router;
