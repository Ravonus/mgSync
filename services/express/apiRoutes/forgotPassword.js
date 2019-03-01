const express = require('express'),
    app = require('../server'),
    mysqlPassword = require('mysql-password'),
    mailer = require('../../mail/mailer'),
    config = require('../../../config/scripts/config'),
    fs = require('fs'),
    Accounts = require('../../../models/Accounts'),
    path = require('path'),
    routes = require('../routes/routes'),
    randomstring = require("randomstring"),
    Users = require('../../../models/mgSync/Users'),
    router = express.Router();

var pathSet = '/forgot';

router.route(pathSet).get(async (req, res) => {




    res.setHeader('Content-Type', 'application/json');
    res.redirect('/?status=finished');

});

app.use('/auth', router);