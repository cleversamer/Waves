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
    let { skip, limit, sortBy, order } = req.query;
    skip = skip || config.default.queryParams.skip.value;
    limit = limit || config.default.queryParams.limit.value;
    sortBy = sortBy || config.default.queryParams.sortBy.value;
    order = order || config.default.queryParams.order.value;

    const brands = await Brand.find({}, {}, { skip, limit }).sort({
      [sortBy]: order,
    });

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
