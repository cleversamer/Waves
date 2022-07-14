const { usersService } = require("../services");

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
