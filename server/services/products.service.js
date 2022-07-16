const { Product } = require("../models/product.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.getAllProducts = async (req) => {
  try {
    let { skip, limit, sortBy, order } = req.query;
    skip = skip || config.default.queryParams.skip.value;
    limit = limit || config.default.queryParams.limit.value;
    sortBy = sortBy || config.default.queryParams.sortBy.value;
    order = order || config.default.queryParams.order.value;

    const products = await Product.find({}, {}, { skip, limit }).sort({
      [sortBy]: order,
    });

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
