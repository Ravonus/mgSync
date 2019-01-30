const sslCertificate = require('get-ssl-certificate');

var port = config.mgSync.server.match(/:[0-9]+/)
if(port) {
    port = port[0].substr(1);
    var url = config.mgSync.server.replace(/^(?:https?:\/\/)?/g,'').replace(`:${port}`,'');
} else {
    var url = config.mgSync.server.replace(/^(?:https?:\/\/)?/g,'');
}

console.log(url);
console.log(port);

sslCertificate.get(url, 1000, port).then(function (certificate) {
 
    console.log(certificate.subject)

}).catch( (e) => {
    console.log(e)
    process.exit('Token incorrect.');

})

const socket = require("socket.io-client")(config.mgSync.server, {query: `token=${config.mgSync.token}`, secure: true});

global.socket = socket;

console.log(socket.io._callbacks.$packet[0]( (data) => {
    console.log(data)
}))




module.exports = socket;
