const fs = require('fs'),
    { promisify } = require('util'),
    rfs = require('require-from-string');
    dir = __dirname;

fs.readdir = promisify(fs.readdir);
fs.readFile = promisify(fs.readFile);

module.exports = new Promise(async (resolve) => {
    let files = await fs.readdir(dir);
    let loadedRoutes = {}
    await files.forEach(async (file) => {
        if (file !== 'routes.js' && file !== 'routeSetup.js') {
            file = file.substring(0, file.length - 3);
            loadedRoutes[file] = require(`${dir}\\${file}`);
        }
    });
    resolve(loadedRoutes);
});