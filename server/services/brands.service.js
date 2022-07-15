const { Brand } = require("../models/brand.model");

module.exports.addBrand = async (body) => {
  try {
    const brand = new Brand(body);
    await brand.save();

    return brand;
  } catch (err) {
    throw err;
  }
};
