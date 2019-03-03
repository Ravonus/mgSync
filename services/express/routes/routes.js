const express = require('express'),
    routes = require('./routeSetup'),
    passport = require('passport'),
    permissions = require('../middleware/permissions'),
    loadPolicies = require('../middleware/loadPolicies'),
    router = express.Router();

require('../middleware/passport');

routes.then((rf) => {
    Object.keys(rf).forEach(async r => {
        if (!rf[r].type) rf[r].type = 'get';
        if (config.express.signUp && rf[r].path !== '/') {
            router.route(rf[r].path)[rf[r].type](passport.authenticate(['jwt', 'cookie'], { session: false }), permissions(1), loadPolicies('all'), rf[r].route);
        } else {
            router.route(rf[r].path)[rf[r].type](rf[r].route);
        }

    });

});

module.exports = router;
