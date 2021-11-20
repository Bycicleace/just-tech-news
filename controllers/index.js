const router = require('express').Router();

const apiRoutes = require('./api/index.js');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// If a request is made to an endpoint that doesn't exist....
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;