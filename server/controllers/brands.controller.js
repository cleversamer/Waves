const { brandsService } = require("../services");
const httpStatus = require("http-status");

module.exports.addBrand = async (req, res, next) => {
  try {
    const brand = await brandsService.addBrand(req.body);
    res
      .status(httpStatus.CREATED)
      .header({ "Access-Control-Allow-Origin": "*" })
      .json(brand);
  } catch (err) {
    next(err);
  }
};

module.exports.getBrand = async (req, res, next) => {
  try {
    const brand = await brandsService.getBrand(req.params.id);
    res.status(200).header({ "Access-Control-Allow-Origin": "*" }).json(brand);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBrand = async (req, res, next) => {
  try {
    const brand = await brandsService.deleteBrand(req.params.id);
    res.status(200).header({ "Access-Control-Allow-Origin": "*" }).json(brand);
  } catch (err) {
    next(err);
  }
};

module.exports.updateBrand = async (req, res, next) => {
  try {
    const brand = await brandsService.updateBrand(req);
    res.status(200).header({ "Access-Control-Allow-Origin": "*" }).json(brand);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await brandsService.getAllBrands(req);
    res.status(200).header({ "Access-Control-Allow-Origin": "*" }).json(brands);
  } catch (err) {
    next(err);
  }
};
