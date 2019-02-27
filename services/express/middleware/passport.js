const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    mysqlPassword = require('mysql-password'),
     customStrategy = require('./customStrategy'),
    Users = require('../../../models/mgSync/Users'),
    Accounts = require('../../../models/Accounts')
ExtractJWT = passportJWT.ExtractJwt;


passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, cb) {

        let user
        user = await Users.read({ username }).catch(e => {
            user = e;
            cb({ err: e })
        });
        if (user) {
            let id = user[0].accid
            let account;
            account = await Accounts.read({ id, password: mysqlPassword(password.trim()) }).catch(e => {
                account = e;
                cb({ err: e })

            });

            if (account) {
                cb(null, { user, account })
            }
        }

    }
));

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  };

passport.use(new JWTStrategy({
    
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.express.jwt
},
    function (jwtPayload, cb) {
        return cb(JSON.stringify(jwtPayload));
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  
    }
));

passport.use(new customStrategy('jwt',

    function (jwtPayload, cb) {
        //need to get JWT info still.
        return cb(JSON.stringify(jwtPayload));

    }
  ));