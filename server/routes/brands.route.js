const { Router } = require("express");
const router = Router();
const { brandsController } = require("../controllers");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(brandsController.getAllBrands)
  .post([auth("createAny", "brand")], brandsController.addBrand);

router
  .route("/:id")
  .get(brandsController.getBrand)
  .patch(auth("updateAny", "brand"), brandsController.updateBrand)
  .delete([auth("deleteAny", "brand")], brandsController.deleteBrand);

module.exports = router;
