socket.on('noToken', (data) => {
      console.log(data);
      socket.disconnect();
});