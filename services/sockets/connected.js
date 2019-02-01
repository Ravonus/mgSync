socket._connectTimer = setTimeout(function () {
    socket.close();
    console.log('Could not make communication to mog.garden')
    process.exit('Token incorrect.');
}, config.mgSync.timeout);

socket.on('connected', (data) => {
    if (typeof data === 'object' && data.authenticated === true) {
        clearTimeout(socket._connectTimer);
        console.log('connected to mog.garden');
        socket.emit('imHere', config.mgSync.token);
    } else {
        console.log(data);
        console.log('Token incorrect.');
        process.exit('Token incorrect.');
        socket.disconnect();
    }
});