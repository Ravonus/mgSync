const express = require('express'),
path = require('path'),
routes = require('./routes/routes'),
app = express(),
ip = require('ip'),
dir = __dirname;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(dir+ '/shared'));
app.use( express.static(dir + '/public'));
app.use('/', routes);
app.listen(config.mgSync.port, () => {
    log('express-started', [ip.address(), config.mgSync.port]);
});
module.exports = app;