const path = require('path');
const fs = require('fs');

let models = {};

let dirs = fs.readdirSync(path.join(__dirname, '../../../models'));
dirs.forEach((dir) => {
    if(dir.substring(dir.length -3) === '.js') {
    models[dir.slice(0, -3)] = require(path.join(__dirname, '../../../models', dir));
    }
});

module.exports = {
    route: async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.body.rows && req.body.type === 'external') {
            var publicIp = await Functions.publicIp();
            models.Zone_Settings.update({ zoneid: req.body.rows }, { zoneip: publicIp }, (err, data) => {
                if (err) {
                    return res.send(JSON.stringify({ err: err }));
                }
                if (data.length !== 0) return res.send({ success: 'success', type: 'ip', value: publicIp });
            });

        } else if (req.body.rows && req.body.type === 'local') {

            models.Zone_Settings.update({ zoneid: req.body.rows }, { zoneip: '127.0.0.1' }, (err, data) => {
                if (err) {
                    return res.send(JSON.stringify({ err: err }));
                }
                if (data.length !== 0) return res.send({ success: 'success', type: 'ip', value: '127.0.0.1' });
            });

        } else if (req.body.rows && req.body.type === 'internal') {

            var gateway = await Functions.gateway();

            models.Zone_Settings.update({ zoneid: req.body.rows }, { zoneip: gateway }, (err, data) => {
                if (err) {
                    return res.send(JSON.stringify({ err: err }));
                }
                if (data.length !== 0) return res.send({ success: 'success', type: 'ip', value: gateway });
            });

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
