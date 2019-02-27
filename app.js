global.log = require('./functions/messenger');
global.config = require('./config/scripts/config');

Promise.all(require('./config/scripts/config').doneArray).then((data) => {

    global.config.dsp = data[0];
    global.config.mail = data[3];
    global.config.express = data[4];
    var checkProcess = require('./services/exec/checkProcess');
    if (config.dsp.executables && config.dsp['DS-dir']) {
        config.dsp.executables.forEach(executable => {
            checkProcess(executable);
        });
    }

    global.config.express = require('./config/express');

    global.config.mgSync = data[1];
    global.crud = require('./controllers/crud');
    require('./services/sockets/socket');
    require('./services/sockets/socketFunctions').then(r => {

        if (config.dsp['conf-dir']) {
            let confFiles = require('./config/scripts/dspConf');
            Promise.all(confFiles).then(function (data) {

                global.dspConfFiles = data;
            }).catch(obj => {
                log('dspConfNotFound');
            });
        }

    });
    require('./services/express/server');
    Functions.Cleanup();

});
