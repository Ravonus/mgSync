global.config = require('./config/config');
global.crud = require('./controllers/crud')
require('./services/sockets/socket');
require('./services/sockets/socketFunctions');
if (config.dsp['conf-dir']) {
    let confFiles = require('./config/conf');
    Promise.all(confFiles).then(function (data) {
    }).catch(e => console.log(e));
}