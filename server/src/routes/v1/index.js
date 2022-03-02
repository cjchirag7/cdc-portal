const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const courseRoute = require('./course.route');
const branchRoute = require('./branch.route');
const companyRoute = require('./company.route');
const jnfRoute = require('./jnf.route');
const infRoute = require('./inf.route');
const gradYearRoute = require('./gradYear.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/branches',
    route: branchRoute,
  },
  {
    path: '/companies',
    route: companyRoute,
  },
  {
    path: '/jnfs',
    route: jnfRoute,
  },
  {
    path: '/infs',
    route: infRoute,
  },
  {
    path: '/gradYear',
    route: gradYearRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
