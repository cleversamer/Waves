const { User } = require("../models/user.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

module.exports.validateToken = async (token) => {
  try {
    return jwt.verify(token, process.env["JWT_PRIVATE_KEY"]);
  } catch (err) {
    throw err;
  }
};

module.exports.addItemToCart = async (req) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.noProductId;
      throw new ApiError(statusCode, message);
    }

    if (!mongoose.isValidObjectId(itemId)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.invalidObjectId;
      throw new ApiError(statusCode, message);
    }

    const user = await User.updateOne(
      { _id: req.user._id },
      { $push: { cart: itemId } }
    );

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.removeCartItem = async (req) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.noProductId;
      throw new ApiError(statusCode, message);
    }

    if (!mongoose.isValidObjectId(itemId)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.invalidObjectId;
      throw new ApiError(statusCode, message);
    }

    const user = req.user;
    const index = req.user.cart.findIndex((item) => item === itemId);
    if (index === -1) {
      return user;
    }

    user.cart.splice(index, 1);
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};
