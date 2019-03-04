const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    passport.authenticate('local-signin', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Username or Password incorrect.',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, config.express.jwt);
            user = user.user;
            return res.json({ user, token });
        });
    })(req, res, next);
})

module.exports = router;