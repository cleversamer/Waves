const { authService } = require("../services");

module.exports = {
  async hello() {
    try {
      authService.userHello();
    } catch (err) {}
  },
};
