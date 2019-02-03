const fs = require('fs');
var promise = new Promise((resolve, reject) => {
fs.readdir('./services/sockets', function (err, sockets) {

        if(config.mgSync.disabled) return reject;
    
        sockets.forEach((socket, index) => {
            if (socket !== 'socket.js' && socket !== 'socketFunctions.js') {
                require(`./${socket}`);
            }
            if(index === sockets.length - 1) {
                global.log = Functions.messenger;
                resolve('finished');
            }
        });
    })
});

module.exports = promise;