const passport = require("passport");
const { ApiError } = require("./apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

const verify = (req, res, resolve, reject) => async (err, user) => {
  if (err || !user) {
    const statusCode = httpStatus.UNAUTHORIZED;
    const message = config.errors.invalidToken;
    return reject(new ApiError(statusCode, message));
  }

  /////

  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verify(req, res, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
