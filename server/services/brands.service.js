const { Brand } = require("../models/brand.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.addBrand = async (body) => {
  try {
    const brand = new Brand(body);
    await brand.save();

    return brand;
  } catch (err) {
    throw err;
  }
};

module.exports.getBrand = async (brandId) => {
  try {
    const brand = await Brand.findById(brandId);
    if (!brand) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.brandNotFound;
      throw new ApiError(statusCode, message);
    }

    return brand;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteBrand = async (brandId) => {
  try {
    const brand = await Brand.findByIdAndDelete(brandId);
    if (!brand) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.brandNotFound;
      throw new ApiError(statusCode, message);
    }

    return brand;
  } catch (err) {
    throw err;
  }
};

module.exports.updateBrand = async (req) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    if (!brand) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.brandNotFound;
      throw new ApiError(statusCode, message);
    }

    return brand;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllBrands = async (req) => {
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

    const brands = await Brand.find({}, {}, { skip, limit });

    if (!brands.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.noBrands;
      throw new ApiError(statusCode, message);
    }

    return brands;
  } catch (err) {
    throw err;
  }
};
