const express = require('express'),
    routes = require('./routeSetup'),
    passport = require('passport'),
    permissions = require('../middleware/permissions'),
    groups = require('../middleware/groups'),
    loadPolicies = require('../middleware/loadPolicies'),
    router = express.Router();

require('../middleware/passport');

routes.then((rf) => {
    Object.keys(rf).forEach(async r => {
        if (!rf[r].type) rf[r].type = 'get';
        if (config.express.signUp && rf[r].path !== '/') {
            let permNumber = rf[r].permissions ? rf[r].permissions : 1;
            let groupArray = rf[r].groups ? rf[r].groups : ['administrators'];
            if(typeof groupArray === 'string') groupArray = [groupArray]; 
            router.route(rf[r].path)[rf[r].type](passport.authenticate(['jwt', 'cookie'], { session: false }), permissions(permNumber), groups(groupArray), rf[r].route);
        } else {
            router.route(rf[r].path)[rf[r].type](rf[r].route);
        }

    });

});

module.exports = router;
