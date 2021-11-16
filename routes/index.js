const router = require('express').Router();

const apiRoutes = require('./api/index.js');

router.use('/api', apiRoutes);

// If a request is made to an endpoint that doesn't exist....
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;