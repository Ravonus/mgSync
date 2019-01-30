socket.on('connected', (data)=> {
    if(typeof data === 'object' &&  data.authenticated === true) {
        console.log('connected to mog.garden');
        socket.emit('imHere', config.mgSync.token);
    } else {
        console.log('Token incorrect.');
        process.exit('Token incorrect.');
        socket.disconnect();
    }
  });