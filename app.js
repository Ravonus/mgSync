global.config = require('./config/config');
global.crud = require('./controllers/crud')
require('./services/sockets/socketFunctions');
global.functionsDone = false;
function _cb() {

    if (global.functionsDone === false) {
        setTimeout(function(){ _cb(); },0);
        
    } else {
        moveOn()
    }
}

_cb()

function moveOn() {

    global.log = Functions.messenger;
    if (config.dsp['conf-dir']) {
        let confFiles = require('./config/conf');
        Promise.all(confFiles).then(function (data) {
        }).catch(obj => {
            log('A dsp conf file was not found.')
        });
    }

  //  log('ERRRRROR', 'error');
}

require('./services/sockets/socket');

//global.log('ERRRRROR', 'error')