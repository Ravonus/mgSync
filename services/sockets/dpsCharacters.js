const Chars = require('../../models/Chars');

socket.on('characters', (server, data) => {
    if (!data) data = {}
    Chars.read(data, (err, data) => {
        if(err || data && data.length === 0) return socket.emit('characters', server, {err:'error'});
        data.map(v => v.dataValues.serverName = server.name)
        socket.emit('characters', server, data);
    })
});