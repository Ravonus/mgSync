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

var pathSet = '/registration';
router.route(pathSet).post(async (req, res) => {

    function createDspAccount(obj) {

        return sendObj = {
            login: obj.username,
            password: mysqlPassword(obj.password),
            email: obj.username,
            email2: 0,
            timelastmodify: Date.now(),
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
        
    }


    async function createUser() {
        let user = await Users.create(userObj).catch(e => {});

        if(user) {
            mailer({ subject: "Please verify email address.", from: "chad@technomancyit.com", to: req.body.email }, {
                name: 'emailVerification',
                replace: [
                    {server:"Mog Garden"},
                    {link:`http://192.168.0.169:1337/auth/verify/${userObj.verified}`},
                    {user: req.body.username}
                ]
            });
        }
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
    res.redirect('/?status=finished');

});

app.use('/auth', router);