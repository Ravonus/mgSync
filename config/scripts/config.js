const { promisify } = require('util'),
  fs = require('fs');


fs.readdir = promisify(fs.readdir);
let files = fs.readdirSync('./config/');

global.Functions = {}
let dsp = new Promise(async (resolve) => {
  let dsp;
  if (!files.includes('dsp.json')) {
    dsp = require('../../setup/dsp.json');
    fs.writeFileSync('./config/dsp.json', JSON.stringify(dsp, null, 4));
  } else {
    dsp = require('../dsp.json');
  }
  resolve(dsp);
});

let mgSync = new Promise(async (resolve) => {
  let mgSync;
  if (!files.includes('mgSync.json')) {
    mgSync = require('../../setup/mgSync.json');
    fs.writeFileSync('./config/mgSync.json', JSON.stringify(mgSync, null, 4));
  } else {
    mgSync = require('../mgSync.json');
  }

  //This sets up threading for the application (Auto will setup max cpu threads+hyperthreading)(softwareOff turns hyperthreading off)
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


let mail = new Promise(async (resolve) => {
  let mail;
  if (!files.includes('mail.json')) {
    mail = require('../../setup/mail.json');
    fs.writeFileSync('./config/mail.json', JSON.stringify(mail, null, 4));
  } else {
    mail = require('../mail.json');
  }
  resolve(mail);
});

let express = new Promise(async (resolve) => {
  let express;
  if (!files.includes('express.json')) {
    express = require('../../setup/express.json');
    fs.writeFileSync('./config/express.json', JSON.stringify(express, null, 4));
  } else {
    express = require('../express.json');
  }
  resolve(express);
});

let doneArray = [dsp, mgSync, functionsDone, mail, express];
module.exports = {
  dsp,
  mgSync,
  mail,
  express,
  functionsDone,
  doneArray
}

