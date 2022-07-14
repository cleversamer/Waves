const { authService } = require("../services");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.createUser(email, password);
    const token = user.genAuthToken();

    res.cookie("x-access-token", token).status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  //
};

module.exports.isAuth = async (req, res, next) => {
  //
};
