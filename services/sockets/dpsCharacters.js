const Accounts = require('../../models/Accounts');
const Chars = require('../../models/Chars');

socket.on('characters', (server, data) => {
    if(!data) data = {}
    Chars.read(data, (err, data) => {
        socket.emit('characters', { server, data});
    })
});