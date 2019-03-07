const express = require('express'),
    server = require('../server'),
    mysqlPassword = require('mysql-password'),
    jwt = require('jsonwebtoken'),
    cookie = require('cookie'),
    mailer = require('../../mail/mailer'),
    config = require('../../../config/scripts/config'),
    Accounts = require('../../../models/Accounts'),
    randomstring = require("randomstring"),
    Users = require('../../../models/mgSync/Users'),
    router = express.Router();

var pathSet = '/registration';

router.route(pathSet).post(async (req, res, next) => {

    res.setHeader('Content-Type', 'application/json');

    if (req.body.resend) {

        let cookies = {}
        let user;
        if (req.headers.cookie) cookies = cookie.parse(req.headers.cookie);

        if (cookies.jwt) {
            user = await jwt.decode(cookies.jwt, config.express.jwt);
        }

        if (user) {

            let hostname;
            if (config.express.port) {
                hostname = `${config.express.hostname}:${config.express.port}`
            } else {
                hostname = config.express.hostname;
            }

            let newRegistrationToken = randomstring.generate(32);

            await Users.update({ accid: user.user[0].accid }, { verified: newRegistrationToken });

            await mailer({ subject: "Please verify email address.", from: config.mail.user, to: user.user[0].email }, {
                name: 'emailVerification',
                replace: [
                    { server: "Mog Garden" },
                    { link: `${hostname}?verify=${newRegistrationToken}&lookup=${user.user[0].accid}` },
                    { user: user.user[0].username }
                ]
            });

            res.status(200).send(JSON.stringify({
                alert: {
                    type: "success",
                    title: "Registration email",
                    text: `Email was sent successfully to ${user.user[0].email}`
                }
            }));

        } else {
            res.status(401).send({ err: 'Invalid cookie' });
        }

    } else {

        function createDspAccount(obj) {

            return sendObj = {
                login: obj.username,
                password: mysqlPassword(obj.password),
                email: obj.username,
                email2: 0,
                timelastmodify: Date.now(),
                status: 0,
                timecreate: Date.now()
            }

        }

        if (req.body.username === '') {
            return res.status(401).send('{"err":"noAccount"}');
        }

        if (req.body.password === '') {
            return res.status(401).send('{"err":"noPassword"}');
        }

        let userObj = req.body;

        let accountExist = await Accounts.read({ login: req.body.username }).catch(e => { });

        if (accountExist) passwordVerify = await Accounts.read({ id: accountExist[0].id, password: mysqlPassword(req.body.password) }).catch(e => { });

        if (accountExist && passwordVerify) {

            let err = {
                status:"error",
                type: "alert",
                title: "Registration error"
            }

            let emailExist = await Users.read({ email: req.body.email }).catch(e => { });

            if (emailExist) {
                err.errorMsg = 'Mog Sync email already exists.';
               return res.status(401).send(JSON.stringify(err))
            };

            let myAccountExist = await Users.read({ username: req.body.username }).catch(e => { });

            if (myAccountExist) {
                err.errorMsg = 'Mog Sync account already exists.';
            return res.status(401).send(JSON.stringify(err));
            }

            let sendObj = createDspAccount(req.body);
            sendObj.status = 0;
            await Accounts.update({ id: accountExist[0].id }, sendObj).catch(e => console.log(e));

            userObj.permissions = 2;
            userObj.groups = 2;
            userObj.status = 1;
            userObj.verified = randomstring.generate(32);
            userObj.accid = accountExist[0].id;
            delete userObj.password;
            createUser();

        } else if (accountExist && !passwordVerify) {

            return res.status(401).send('{"err":"dspPassword"}');

        } else {
            let sendObj = createDspAccount(req.body);
            let accounts = await Accounts.read({}).catch(e => { });

            let ids = [];

            await Functions.asyncForEach(accounts, (account) => {
                ids.push(account.id);
            })

            ids = ids.sort();
            let found = false;
            for (var i = 1; i < ids.length; i++) {
                if (ids[i] - ids[i - 1] != 1) {
                    let id = ids[i] - 1;
                    sendObj.id = id;
                    account = await Accounts.create(sendObj).catch(e => { console.log(e) });
                    i = ids.length;
                    found = true;
                }
                if (i === ids.length - 1) {
                    sendObj.id = ids[ids.length - 1] + 1;

                    account = await Accounts.create(sendObj).catch(e => { console.log(e) });
                }
            }

            if (account) {
                userObj.accid = account.id;
                userObj.permissions = 2;
                userObj.groups = 2;
                userObj.status = 1;
                userObj.verified = randomstring.generate(32);
            //    createUser();
                let createdUser = await createUser();

                 if(createdUser.errorMsg) {
                    createdUser.type = "alert";
                    createdUser.title = "Registration error";
                    createdUser.status = 'error';
                    Accounts.delete({id:userObj.accid});
                     return res.status(401).send(JSON.stringify(createdUser));
                 }

            }

        }

        async function createUser() {

            let user = await Users.create(userObj).catch(e => { 
                return {errorMsg:e.original.sqlMessage};
            });
            let hostname;
            if (user && !user.errorMsg) {

                console.log(user);

                if (config.express.port) {
                    hostname = `${config.express.hostname}:${config.express.port}`
                } else {
                    hostname = config.express.hostname;
                }

               await mailer({ subject: "Please verify email address.", from: config.mail.user, to: req.body.email }, {
                    name: 'emailVerification',
                    replace: [
                        { server: "Mog Garden" },
                        { link: `${hostname}?verify=${userObj.verified}&lookup=${user.accid}` },
                        { user: req.body.username }
                    ]
                });

                return user;
            } else {
                return user;
            }
        }

        let accountSend = accountExist ? accountExist : account.dataValues;

        let objString = { user: [userObj], account: accountSend, registration: true };

        let token = jwt.sign(objString, config.express.jwt);
        objString.token = token;
        objString = JSON.stringify(objString);
        res.status(200).send(objString);

    }

});

server.use('/auth', router);