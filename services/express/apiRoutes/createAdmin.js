const express = require('express'),
    server = require('../server'),
    mysqlPassword = require('mysql-password'),
    fs = require('fs'),
    Accounts = require('../../../models/Accounts'),
    path = require('path'),
    routes = require('../routes/routes'),
    Users = require('../../../models/mgSync/Users'),
    router = express.Router();

var pathSet = '/createAdmin';
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

    if (!req.body.dsp || Number(req.body.dsp) === 0) {

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
                create();
                i = ids.length;
                found = true;
            }
            if (i === ids.length - 1) {
                create();
            }
        }

        async function create() {

            if (!found) sendObj.id = ids[ids.length - 1] + 1;
            let create = await Accounts.create(sendObj).catch(e => console.log(e));
            userObj.accid = create.id;
            userObj.permissions = 1;
            userObj.groups = 1;
            userObj.status = 1;
            createUser()
        }

    } else {

        let account = await Accounts.read({ login: req.body.username }).catch(e => { });
        if (!account) return res.redirect('/?err=findAccount');
        let sendObj = createDspAccount(req.body);
        await Accounts.update({ id: account[0].id }, sendObj);
        userObj.verified = 1;
        userObj.permissions = 1;
        userObj.groups = 1;
        userObj.status = 1;
        userObj.accid = account[0].id;
        createUser()
    }

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/?status=finished');

    async function createUser() {
        let user = await Users.create(userObj);
        const { spawn } = require('child_process');

            global.server.close( async () => {
                delete global.server;
                delete server;
                delete global.server;
                delete require.cache[require.resolve('../server')];

                let dir = fs.readdirSync(path.join(__dirname, '../routes') );

                await Functions.asyncForEach(dir, (file) => {
                    delete require.cache[require.resolve('../routes/'+ file)];
                })
                
                require('../server');
                console.log("restarted webserver...");
            });
        }
});

server.use('/', router);