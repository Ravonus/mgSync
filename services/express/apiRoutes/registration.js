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

var pathSet = '/registration';

router.route(pathSet).post(async (req, res) => {



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
        return res.redirect('/?err=noAccount');
    }

    if (req.body.password === '') {
        return res.redirect('/?err=noPassword');
    }

    let userObj = req.body;

    let accountExist = await Accounts.read({login:req.body.username}).catch(e => { });

    if(accountExist) passwordVerify = await Accounts.read({id:accountExist[0].id, password:mysqlPassword(req.body.password)}).catch(e => { });

    if(accountExist && passwordVerify ) {

        let emailExist = await Users.read({email:req.body.email}).catch(e => { });

        if(emailExist) return res.send(404,'{"err":"Mog Sync email already exists."}');

        let sendObj = createDspAccount(req.body);
        sendObj.status = 0;
        await Accounts.update({ id: accountExist[0].id }, sendObj);

        userObj.permissions = 2;
        userObj.groups = 2;
        userObj.status = 1;
        userObj.verified = randomstring.generate(32);
        userObj.accid = accountExist[0].id;
        delete userObj.password;
        createUser();

    } else if(accountExist && !passwordVerify ) {

        return res.redirect('/?err=dspPassword');

    } else {
        let sendObj = createDspAccount(req.body);
        let accounts = await Accounts.read({}).catch(e => { });

        let ids = [];

        await Functions.asyncForEach(accounts, (account) => {
            ids.push(account.id);
        })

        ids = ids.sort();
        let id;
        let found = false;
        for (var i = 1; i < ids.length; i++) {
            if (ids[i] - ids[i - 1] != 1) {
                id = ids[i] - 1;
                sendObj.id = id;
                account = await Accounts.create(sendObj).catch(e => {console.log(e)});
                i = ids.length;
                found = true;
            }
            if (i === ids.length - 1) {
                sendObj.id = ids.length - 1;

                account = await Accounts.create(sendObj).catch(e => {console.log(e)});
            }
        }


        

        if(account) {
        userObj.accid = account.id;
        userObj.permissions = 2;
        userObj.groups = 2;
        userObj.status = 1;
        userObj.verified = randomstring.generate(32);
        createUser();

        }
        
    }


    async function createUser() {
        console.log('ob', userObj)

        let user = await Users.create(userObj).catch(e => {console.log(e)});
        let hostname;
        if(user) {
            
            if(config.express.port) {
                hostname = `${config.express.hostname}:${config.express.port}`
            } else {
                hostname = config.express.hostname;
            }

            mailer({ subject: "Please verify email address.", from: config.mail.user, to: req.body.email }, {
                name: 'emailVerification',
                replace: [
                    {server:"Mog Garden"},
                    {link:`${hostname}/auth/verify/${userObj.verified}?lookup=${user.accid}`},
                    {user: req.body.username}
                ]
            });
        }
    }


    res.setHeader('Content-Type', 'application/json');
    res.redirect('/?status=finished');

});

app.use('/auth', router);