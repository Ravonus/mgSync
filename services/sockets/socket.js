const sslCertificate = require('get-ssl-certificate');

var port = config.mgSync.server.match(/:[0-9]+/)
if (port) {
    port = port[0].substr(1);
    var url = config.mgSync.server.replace(/^(?:https?:\/\/)?/g, '').replace(`:${port}`, '');
} else {
    var url = config.mgSync.server.replace(/^(?:https?:\/\/)?/g, '');
}

if (config.mgSync.secure) sslCertificate.get(url, 10000, port).then(function (certificate) {


    if (certificate && certificate.subject && certificate.subject.CN !== url) {

        log('certMatch');

    }

}).catch((e) => {
    log('nonSecure');
});

const socket = require("socket.io-client")(config.mgSync.server, { query: `token=${config.mgSync.token}` });

global.socket = socket;

module.exports = socket;
