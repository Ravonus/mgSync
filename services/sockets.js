const socket = require("socket.io-client")('http://71.205.29.58:3002',{query: "token=123r"})

socket.on('connected', (data)=> {
  console.log('CONNECTED', data)
})

