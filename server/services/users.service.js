const { User } = require("../models/user.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserProfile = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.userNotFound;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserEmail = async (req) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          email: req.body.email,
          verified: false,
        },
      },
      { new: true }
    );

    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.userNotFound;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};
