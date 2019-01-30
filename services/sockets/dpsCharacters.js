const Accounts = require('../../models/Accounts');
const Chars = require('../../models/Chars');

socket.on('characters', (id, data) => {
    if(!data) data = {}
    Chars.read(data, (err, data) => {
        socket.emit('characters', id, data);
    })
});