const express = require('express'),
    app = require('../server'),
    mysqlPassword = require('mysql-password'),
    mailer = require('../../mail/mailer'),
    fs = require('fs'),
    Accounts = require('../../../models/Accounts'),
    path = require('path'),
    routes = require('../routes/routes'),
    randomstring = require("randomstring"),
    Users = require('../../../models/mgSync/Users'),
    router = express.Router();

var pathSet = '/verify/:id';
router.route(pathSet).get(async (req, res) => {

    const token = req.url.split('/')[2];


    if(token) {
      
    }

    // if (!req.body.dsp || Number(req.body.dsp) === 0) {

    //     let sendObj = createDspAccount(req.body);

    //     let accounts = await Accounts.read({}).catch(e => { });

    //     let ids = [];

    //     await Functions.asyncForEach(accounts, (account) => {
    //         ids.push(account.id);
    //     })

    //     ids = ids.sort();
    //     let id;
    //     let found = false;
    //     for (var i = 1; i < ids.length; i++) {
    //         if (ids[i] - ids[i - 1] != 1) {
    //             id = ids[i] - 1;
    //             create();
    //             i = ids.length;
    //             found = true;
    //         }
    //         if (i === ids.length - 1) {
    //             create();
    //         }
    //     }

    //     async function create() {

    //         if (!found) sendObj.id = ids[ids.length - 1] + 1;
    //         let create = await Accounts.create(sendObj).catch(e => console.log(e));

    //         userObj.accid = create.id;
    //         userObj.verified = 1;
    //         userObj.permissions = 1;
    //         userObj.groups = 1;
    //         userObj.status = 1;
    //         createUser()
    //     }

    // } else {

    //     let account = await Accounts.read({ login: req.body.username }).catch(e => { });
    //     if (!account) return res.redirect('/?err=findAccount');
    //     let sendObj = createDspAccount(req.body);
    //     await Accounts.update({ id: account[0].id }, sendObj);
    //     userObj.verified = 1;
    //     userObj.permissions = 1;
    //     userObj.groups = 1;
    //     userObj.status = 1;
    //     userObj.accid = account[0].id;
    //     createUser()
    // }

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/?status=verified');

});

console.log('RAN')
app.use('/auth', router);