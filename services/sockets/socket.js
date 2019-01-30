const socket = require("socket.io-client")(config.mgSync.server,{query: `token=${config.mgSync.token}`});

global.socket = socket;

module.exports = socket;
