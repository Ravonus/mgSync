const express = require('express'),
    app = require('../server'),
    passport = require('passport'),
    router = express.Router();

    require('../middleware/passport');

var pathSet = '/characters/:id';
router.route(pathSet).get(async (req, res) => {

    console.log('W))T')

});


app.use('/auth',  passport.authenticate(['jwt', 'cookie'], {session: false}), router);