socket.on('noToken', (data) => {
      log('No token', 'error');
      socket.disconnect();
});