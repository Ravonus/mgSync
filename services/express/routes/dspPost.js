const path = require('path');
const fs = require('fs');

let models = {};

let dirs = fs.readdirSync(path.join(__dirname, '../../../models'));
dirs.forEach((dir) => {
    models[dir.slice(0, -3)] = require(path.join(__dirname, '../../../models', dir));
});

module.exports = {
    route: async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.body.rows) {

            console.log('WORKED', req.body.rows);

        } else {

            models[req.body.table].update(req.body.id, req.body.body, (err, data) => {
                if (err) {
                    return res.send(JSON.stringify({ err: err }));
                }
                if (data.length !== 0) return res.send({ success: 'success' });
            });

        }

    },
    path: '/dspPost',
    type: 'post'
}
