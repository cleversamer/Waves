const { productsService } = require("../services");
const httpStatus = require("http-status");

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts(req);
    res
      .status(200)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(products);
  } catch (err) {
    next(err);
  }
};

module.exports.addProduct = async (req, res, next) => {
  try {
    const product = await productsService.addProduct(req.body);
    res
      .status(httpStatus.CREATED)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(product);
  } catch (err) {
    next(err);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    res
      .status(200)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(product);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productsService.updateProduct(req);
    res
      .status(200)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(product);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productsService.deleteProduct(req);
    res
      .status(200)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(product);
  } catch (err) {
    next(err);
  }
};
