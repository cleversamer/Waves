const { Router } = require("express");
const router = Router();
const authRoute = require("./auth.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
