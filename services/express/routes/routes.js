const express = require('express'),
    routes = require('./routeSetup'),
    router = express.Router();

routes.then((rf) => {
    Object.keys(rf).forEach(r => {
        if(!rf[r].type) rf[r].type = 'get';
        router.route(rf[r].path)[rf[r].type](rf[r].route);
    });

});

module.exports = router;
