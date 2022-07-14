const { User } = require("../models/user.model");

module.exports.createUser = async (email, password) => {
  try {
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};
