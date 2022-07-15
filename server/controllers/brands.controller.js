const { brandsService } = require("../services");
const httpStatus = require("http-status");

module.exports.addBrand = async (req, res, next) => {
  try {
    const brand = await brandsService.addBrand(req.body);
    res.status(httpStatus.CREATED).json(brand);
  } catch (err) {
    next(err);
  }
};
