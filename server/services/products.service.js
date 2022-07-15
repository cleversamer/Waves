const { Product } = require("../models/product.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.getAllProducts = async (req) => {
  try {
    let { skip, limit } = req.body;
    if (typeof skip !== "number" || typeof limit !== "number") {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.invalidPaginationFilter;
      throw new ApiError(statusCode, message);
    }

    skip = skip.toString();
    limit = limit.toString();

    if (!skip || !limit) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.noPaginationFilter;
      throw new ApiError(statusCode, message);
    }

    const products = await Product.find({}, {}, { skip, limit });

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

module.exports.getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.productNotFound;
      throw new ApiError(statusCode, message);
    }

    return product;
  } catch (err) {
    throw err;
  }
};

module.exports.updateProduct = async (req) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    if (!product) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.productNotFound;
      throw new ApiError(statusCode, message);
    }

    return product;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteProduct = async (req) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.productNotFound;
      throw new ApiError(statusCode, message);
    }

    return product;
  } catch (err) {
    throw err;
  }
};
