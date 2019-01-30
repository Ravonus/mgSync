const fs = require('fs');

fs.readdir('./services/sockets', function(err, sockets) {

    sockets.forEach( (socket) => {
        if(socket !== 'socket.js' && socket !== 'socketFunctions.js') {
            require(`./${socket}`);
        }
    });
});