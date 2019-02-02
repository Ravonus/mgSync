global.config = require('./config/scripts/config');
global.crud = require('./controllers/crud')

require('./services/sockets/socketFunctions').then(r => {
    if (config.dsp['conf-dir']) {
        let confFiles = require('./config/scripts/dspConf');
        Promise.all(confFiles).then(function (data) {
            global.dspConfFiles = data;
        }).catch(obj => {
            log('dpsConfNotFound');
        });
    }
});

require('./services/sockets/socket');