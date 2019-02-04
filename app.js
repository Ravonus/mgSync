

global.log = require('./functions/messenger')

global.config = require('./config/scripts/config');

require('./config/scripts/config').dsp.then(function (dsp) {
    global.config.dsp = dsp;
    var checkProcess = require('./services/exec/checkProcess');
    if (config.dsp.executables) {
        config.dsp.executables.forEach(executable => {
            checkProcess(executable);
        });
    }

    require('./config/scripts/config').mgSync.then(function (mgSync) {
        global.config.mgSync = mgSync;
        global.crud = require('./controllers/crud');
        require('./services/sockets/socket');
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

    });

    // if(!config.mgSync.disabled) require('./services/sockets/socket');

});