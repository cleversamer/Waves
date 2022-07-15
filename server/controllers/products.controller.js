const { productsService } = require("../services");
const httpStatus = require("http-status");

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.addProduct = async (req, res, next) => {
  try {
    const product = await productsService.addProduct(req.body);
    res.status(httpStatus.CREATED).json(product);
  } catch (err) {
    next(err);
  }
};
