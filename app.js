global.config = require('./config/scripts/config');
global.crud = require('./controllers/crud');

require('./services/sockets/socketFunctions').then(r => {
    require('./services/sockets/socket');
    if (config.dsp['conf-dir']) {
        let confFiles = require('./config/scripts/dspConf');
        Promise.all(confFiles).then(function (data) {
            
            global.dspConfFiles = data;
        }).catch(obj => {
            log('dpsConfNotFound');
        });
    }
});

// if(!config.mgSync.disabled) require('./services/sockets/socket');

var checkProcess = require('./services/exec/checkProcess');

if(config.dsp.executables) {
    config.dsp.executables.forEach( executable => {
        checkProcess(executable);
    });
}