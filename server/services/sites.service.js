const { Site } = require("../models/site.model");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");
const config = require("../config.json");

module.exports.addSiteArgs = async (req) => {
  try {
    const site = new Site(req.body);
    await site.save();

    return site;
  } catch (error) {
    throw error;
  }
};

module.exports.getAllSiteArgs = async (req) => {
  try {
    let { skip, limit } = req.params;
    if (typeof skip !== "number" || typeof limit !== "number") {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.invalidPaginationFilter;
      throw new ApiError(statusCode, message);
    }

    skip = skip.toString();
    limit = limit.toString();

    if (!skip || !limit) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = config.errors.noPaginationFilter;
      throw new ApiError(statusCode, message);
    }

    const siteArgs = await Site.find({}, {}, { skip, limit });

    if (!siteArgs.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.noSites;
      throw new ApiError(statusCode, message);
    }

    return siteArgs;
  } catch (err) {
    throw err;
  }
};

module.exports.updateSite = async (req, res, next) => {
  try {
    const site = await Site.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    if (!site) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.siteNotFound;
      throw new ApiError(statusCode, message);
    }

    return site;
  } catch (err) {
    next(err);
  }
};

module.exports.findSiteById = async (req) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.siteNotFound;
      throw new ApiError(statusCode, message);
    }

    return site;
  } catch (err) {
    throw err;
  }
};

module.exports.deleteSite = async (req) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = config.errors.siteNotFound;
      throw new ApiError(statusCode, message);
    }

    return site;
  } catch (err) {
    throw err;
  }
};
