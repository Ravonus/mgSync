const path = require('path');

module.exports = {
    route: (req, res) => {
        let dir = path.join(__dirname, '../../../logs/', `${req.query.type}.log`)
        res.sendFile(dir);
    },
    path: '/logs',
    type: 'get'
}