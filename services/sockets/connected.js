socket._connectTimer = setTimeout(function () {
    log('serverUnreachable');
}, config.mgSync.timeout);

socket.on('connected', (data) => {
    if (typeof data === 'object' && data.authenticated === true) {
        clearTimeout(socket._connectTimer);
        log(`connectTo`);
        socket.emit('imHere', config.mgSync.token);
    } else {
        log('wrongToken');
    }
});