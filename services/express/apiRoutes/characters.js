const express = require('express'),
    app = require('../server'),
    passport = require('passport'),
    Chars = require('../../../models/Chars')
router = express.Router();
require('../middleware/passport');

var pathSet = '/characters/:character';
router.route(pathSet).get(async (req, res) => {
    let character = req.params.character;
    let query = req.query;
    let characters = [];
    let user = JSON.parse(req.user);
    await Functions.asyncForEach(user.account, async account => {

        if (character === 'all') {
            character = { accid: account.id };
        } else {
            character = { accid: account.id, [query.where]: character };
        }

        characters.push(await Chars.read(character).catch(e => console.log(e)));
    });

    res.setHeader('Content-Type', 'application/json');
    user.characters = characters;
    res.send(JSON.stringify(user));

});

app.use('/api', passport.authenticate(['jwt', 'cookie'], { session: false }), router);