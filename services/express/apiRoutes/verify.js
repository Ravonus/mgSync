const express = require('express'),
    app = require('../server'),
    mailer = require('../../mail/mailer'),
    Accounts = require('../../../models/Accounts'),
    cookie = require('cookie'),
    jwt = require('jsonwebtoken'),
    Users = require('../../../models/mgSync/Users'),
    router = express.Router();

var pathSet = '/verify/:id';
router.route(pathSet).get(async (req, res) => {
    let cookies = {}
    if (req.headers.cookie) cookies = cookie.parse(req.headers.cookie);
    let err;
    let verified = req.params.id;

    if (verified) {
        let accid = req.query.lookup

        // if(accountT[0].verified === '' || accountT[0].verified === null) {

        // }
        let account = await Users.read({ accid, verified }).catch(e => {
            err = true;
            res.status(401).send({ "err": "uknown1" });
        });

        let dspAccount = await Accounts.read({ id: accid }).catch(e => {
            err = true;
            res.status(401).send({ "err": "uknown2" });
        });

        if (account) {
            await Users.update({ accid }, { verified: null }).catch(e => {
                err = true;
                res.status(401).send({ "err": "uknown3" });
            });
            await Accounts.update({ id: accid }, { status: 1 }).catch(e => {
                err = true;
                res.status(401).send({ "err": "uknown4" });
            });

            let objSend = {
                user: account,
                account: dspAccount
            }

            objSend.user[0].dataValues.verified = '';

            objSend
            if (cookies.jwt) {

                objSend.cookie = jwt.sign(objSend, config.express.jwt);
            }

            if (!err) res.status(200).send(JSON.stringify(objSend));

        } else {
            res.redirect('/?status=unknownError');
        }
    }
});

app.use('/auth', router);