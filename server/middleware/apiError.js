const mongoose = require("mongoose");
const httpStatus = require("http-status");

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: "error",
    ...err,
  });
};

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode =
      err.statusCode || err instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;

    const message = err.message || httpStatus[statusCode];

    err = new ApiError(statusCode, message);
  }

  next(err);
};

module.exports = {
  ApiError,
  errorHandler,
  errorConverter,
};
