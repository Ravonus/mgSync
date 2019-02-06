const express = require('express'),
    routes = require('./routeSetup'),
    router = express.Router();

routes.then((rf) => {
    Object.keys(rf).forEach(r => {
        router.route(rf[r].path).get(rf[r].route);
    });

});

module.exports = router;
