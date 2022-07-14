const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");
const userService = require("./users.service");

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

module.exports.signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, config.errors.emailNotUsed);
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        config.errors.incorrectCredentials
      );
    }

    return user;
  } catch (err) {
    throw err;
  }
};
