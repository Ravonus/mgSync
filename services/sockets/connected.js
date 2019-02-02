socket._connectTimer = setTimeout(function () {
    log('Could not make communication to mog.garden', 'error');
}, config.mgSync.timeout);

socket.on('connected', (data) => {
    if (typeof data === 'object' && data.authenticated === true) {
        clearTimeout(socket._connectTimer);
        log('connected to mog.garden','success');
        socket.emit('imHere', config.mgSync.token);
    } else {
        log('Token incorrect.', 'error');
    }
});