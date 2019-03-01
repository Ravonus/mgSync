const express = require('express'),
    app = require('../server'),
    passport = require('passport'),
    router = express.Router();
require('../middleware/passport');

var pathSet = '/me';
router.route(pathSet).get(async (req, res) => {
    let user = JSON.parse(req.user);

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(user));

});

app.use('/api', passport.authenticate(['jwt', 'cookie'], { session: false }), router);