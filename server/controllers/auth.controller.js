const { authService } = require("../services");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.createUser(email, password);

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ mssg: err.message });
  }
};

module.exports.signin = async (req, res, next) => {
  //
};

module.exports.isAuth = async (req, res, next) => {
  //
};
