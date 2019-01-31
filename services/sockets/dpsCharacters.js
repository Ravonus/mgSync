const Chars = require('../../models/Chars');

socket.on('characters', (server, data) => {
    if (!data) data = {}
    Chars.read(data, (err, data) => {
        data.map(v => v.dataValues.serverName = server.name)
        socket.emit('characters', server, data);
    })
});