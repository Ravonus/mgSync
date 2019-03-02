const express = require('express'),
    app = require('../server'),
    Accounts = require('../../../models/Accounts'),
    Users = require('../../../models/mgSync/Users'),
    jwt = require('jsonwebtoken'),
    mailer = require('../../mail/mailer'),
    Chars = require('../../../models/Chars'),
    { promisify } = require('util'),
    router = express.Router();

var pathSet = '/forgotPW';

jwt.verify = promisify(jwt.verify);

router.route(pathSet).post(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body.jwt) return res.status(400).send({ err: "Reset token is missing." });

    let decoded = await jwt.verify(req.body.jwt, config.express.jwt).catch(e => res.status(400).send({ err: "Invalid Token" }));
    if (decoded.data) return res.status(200).send({ success: req.body.jwt });
});

app.use('/auth', router);