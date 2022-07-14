const { authService, emailService } = require("../services");
const httpStatus = require("http-status");

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.createUser(email, password);
    const token = user.genAuthToken();

    await emailService.registerEmail(email, user);

    res.cookie("x-access-token", token).status(httpStatus.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.signInWithEmailAndPassword(email, password);
    const token = user.genAuthToken();

    res.cookie("x-access-token", token).status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.isAuth = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};
