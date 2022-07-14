const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.createUser = async (email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashed });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};
