const dsp = require('../dsp.json'),
  mgSync = require('../mgSync.json'),
  { promisify } = require('util'),
  fs = require('fs');

fs.readdir = promisify(fs.readdir);

global.Functions = {}

let functionDir = fs.readdir('./functions/');

functionDir.then((functions) => {

  functions.forEach(async (func, index) => {
    var extension = func.match(/(?:\.([^.]+))?$/)[0];
    if (extension === '.js') {
      var name = func.slice(0, -3);
      global.Functions[name] = await require(`../../functions/${func}`);
    }

    if(index === functions.length - 1) {
      functionsDone = true;
    }

  });

}).catch(err => console.log(err));

module.exports = {
  dsp,
  mgSync
}

