const fs = require('fs');
var promise = new Promise((resolve) => {
fs.readdir('./services/sockets', function (err, sockets) {
    
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