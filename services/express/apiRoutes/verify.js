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
    let err;
    let verified = req.params.id;

    if(verified) {
        let accid = req.query.lookup
       
        // if(accountT[0].verified === '' || accountT[0].verified === null) {

        // }
        let account = await Users.read({accid, verified}).catch(e => {
            err = true;
            res.redirect('/?status=unknownToken'); 
        });
      
        if(account) {
            console.log(account);
            await Users.update({accid}, {verified:null}).catch(e => {
                err = true;
                res.redirect('/?status=unknownError'); 
            });
            await Accounts.update({id:accid}, {status:1}).catch(e => {
                err = true;
                res.redirect('/?status=unknownError'); 
            });
        }
      
    }

    if(!err) res.redirect('/?status=verified'); 

});

console.log('RAN')
app.use('/auth', router);