const { Router } = require("express");
const router = Router();
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
