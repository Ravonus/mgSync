const Accounts = require('../../models/Accounts');
const Chars = require('../../models/Chars');

socket.on('characters', (server, data) => {
    console.log('DATA', server);
    if(!data) data = {}
    Chars.read(data, (err, data) => {
        data.map(v => v.dataValues.serverName = server.name)
        
        socket.emit('characters', server, data);
    })
});