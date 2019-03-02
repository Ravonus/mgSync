const express = require('express'),
    app = require('../server'),
    Accounts = require('../../../models/Accounts'),
    Users = require('../../../models/mgSync/Users'),
    jwt = require('jsonwebtoken'),
    mailer = require('../../mail/mailer'),
    Chars = require('../../../models/Chars'),
    router = express.Router();

var pathSet = '/forgot';

router.route(pathSet).post(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body.login) return res.status(400).send({ err: "Need account name in order to send reset link." });

    let Account = await Accounts.read({ login: req.body.login }).catch(e => {
        return res.status(400).send({ err: "Could not find account or character" });
    });

    if (Account[0]) {

        let charLookup = {
            accid: Account[0].id
        }

        if (req.body.character) charLookup.charname = req.body.character;

        let Character = await Chars.read(charLookup).catch(e => { });

        if (!req.body.character && !Character) {
        } else if (!req.body.character && Character) {
            return res.status(400).send({ err: "Could not find account or character" });
        } else if (Character) {

            //     let email = await Users.read({accid:charLookup.accid}).catch(e => { });



        } else {
            return res.status(400).send({ err: "Could not find account or character" });
        }

        // mailer({ subject: "Password request link", from: config.mail.user, to: req.body.email }, {
        //     name: 'emailVerification',
        //     replace: [
        //         {server:"Mog Garden"},
        //         {link:`${hostname}/auth/verify/${userObj.verified}?lookup=${user.accid}`},
        //         {user: req.body.username}
        //     ]
        // });

        let email = await Users.read({ accid: Account[0].id }).catch(e => { });

        if (email) {

            let hostname;
            if(config.express.port) {
                hostname = `${config.express.hostname}:${config.express.port}`
            } else {
                hostname = config.express.hostname;
            }

            let jwtToken = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: email[0].accid
            }, config.express.jwt)

            mailer({ subject: "Password request link", from: config.mail.user, to: email[0].email }, {
                name: 'passwordReset',
                replace: [
                    { server: "Mog Garden" },
                    { link: `${hostname}/?rp=${jwtToken}` },
                    { link2: `${hostname}/didnotrequest/${jwtToken}` },
                    { user: req.body.login }
                ]
            });
        }

        return res.status(200).send({ status: "Sent password reset to registered email address" });

    }

});

app.use('/auth', router);