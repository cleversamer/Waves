const { Router } = require("express");
const router = Router();
const authRoute = require("./auth.route");
const usersRoute = require("./users.route");
const brandsRoute = require("./brands.route");
const productsRoute = require("./products.route");
const sitesRoute = require("./sites.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/brands",
    route: brandsRoute,
  },
  {
    path: "/products",
    route: productsRoute,
  },
  {
    path: "/sites",
    route: sitesRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
