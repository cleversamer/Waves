const { Product } = require("../models/product.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.getAllProducts = async () => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.noProducts;
      throw new ApiError(statusCode, message);
    }

    return products;
  } catch (err) {
    throw err;
  }
};

module.exports.addProduct = async (body) => {
  try {
    const product = new Product(body);
    await product.save();

    return product;
  } catch (err) {
    throw err;
  }
};
