const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require("passport-jwt"),
    JWTStrategy = passportJWT.Strategy,
    mysqlPassword = require('mysql-password'),
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

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));