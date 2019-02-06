const { promisify } = require('util'),
  fs = require('fs');


fs.readdir = promisify(fs.readdir);

global.Functions = {}
let dsp = new Promise(async (resolve) => {
  let files = await fs.readdir('./config/');
  if (!files.includes('dsp.json')) {
    dsp = require('../../setup/dsp.json');
    fs.writeFileSync('./config/dsp.json', JSON.stringify(dsp));
  } else {
    dsp = require('../dsp.json');
  }
  resolve(dsp);
});

let mgSync = new Promise(async (resolve) => {
  let files = await fs.readdir('./config/');
  if (!files.includes('mgSync.json')) {
    mgSync = require('../../setup/mgSync.json');
    fs.writeFileSync('./config/mgSync.json', JSON.stringify(mgSync));
  } else {
    mgSync = require('../mgSync.json');

  }

  if (mgSync.threads === 'auto') {
    process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1));
  } else if (typeof (mgSync.threads) === 'number') {
    process.env.UV_THREADPOOL_SIZE = environmentToExport.threads;
  } else if (mgSync.threads === 'softwareOff') {
    process.env.UV_THREADPOOL_SIZE = Math.ceil(Math.max(4, require('os').cpus().length * 1) / 2);

  }

  resolve(mgSync);
});

let functionDir = fs.readdir('./functions/');
let functionsDone = new Promise(async (resolve) => {
  functionDir.then((functions) => {

    functions.forEach(async (func, index) => {
      var extension = func.match(/(?:\.([^.]+))?$/)[0];
      if (extension === '.js') {
        var name = func.slice(0, -3);
        global.Functions[name] = await require(`../../functions/${func}`);
      }

      if (index === functions.length - 1) {
        resolve(true);
        functionsDone = true;
      }

    });
  }).catch(err => console.log(err));
});

let doneArray = [dsp, mgSync, functionsDone];
module.exports = {
  dsp,
  mgSync,
  functionsDone,
  doneArray
}

