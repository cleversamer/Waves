const { usersService } = require("../services");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const config = require("../config.json");

module.exports.profile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = await usersService.updateUserProfile(req);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateEmail = async (req, res, next) => {
  try {
    const user = await usersService.updateUserEmail(req);
    const token = user.genAuthToken();

    // send email to verify account

    res.cookie("x-access-token", token).status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.verifyAccount = async (req, res, next) => {
  try {
    const token = await usersService.validateToken(
      req.query[config.verification.queryParam]
    );
    const user = await usersService.findUserById(token.sub);

    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.userNotFound;
      throw new ApiError(statusCode, message);
    }

    if (user.verified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.userVerified;
      throw new ApiError(statusCode, message);
    }

    user.verified = true;
    await user.save();

    res.status(httpStatus.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};
