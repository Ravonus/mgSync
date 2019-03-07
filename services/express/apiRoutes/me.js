const express = require('express'),
    server = require('../server'),
    passport = require('passport'),
    router = express.Router();
require('../middleware/passport');

var pathSet = '/me';
router.route(pathSet).get(async (req, res) => {
    let user = JSON.parse(req.user);

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(user));

});

server.use('/api', passport.authenticate(['jwt', 'cookie'], { session: false }),  server.permissions(3), server.groups(['administrators', 'moderators', 'users']), router);