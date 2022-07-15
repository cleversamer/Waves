const { sitesService } = require("../services");
const httpStatus = require("http-status");

module.exports.addSiteArgs = async (req, res, next) => {
  try {
    const site = await sitesService.addSiteArgs(req);
    res.status(httpStatus.CREATED).json(site);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllSiteArgs = async (req, res, next) => {
  try {
    const siteArgs = await sitesService.getAllSiteArgs(req);
    res.status(200).json(siteArgs);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSite = async (req, res, next) => {
  try {
    const site = await sitesService.updateSite(req);
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};

module.exports.getSite = async (req, res, next) => {
  try {
    const site = await sitesService.findSiteById(req);
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSite = async (req, res, next) => {
  try {
    const site = await sitesService.deleteSite(req);
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};
