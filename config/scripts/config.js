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
  resolve(mgSync);
});

// files.forEach( (file) => {

//   if(file !== 'messages.json' && file !== 'scripts') {
//     console.log('ad',file);
//   }

// });



// if(!files.includes('dsp.json')){
//     dsp = require('../../setup/dsp.json');
//     fs.writeFileSync('../dsp.json', dsp);
// } else {

// }

// if(!files.includes('mgSync.json')){

// }




let functionDir = fs.readdir('./functions/');

functionDir.then((functions) => {

  functions.forEach(async (func, index) => {
    var extension = func.match(/(?:\.([^.]+))?$/)[0];
    if (extension === '.js') {
      var name = func.slice(0, -3);
      global.Functions[name] = await require(`../../functions/${func}`);
    }

    if (index === functions.length - 1) {
      functionsDone = true;
    }

  });
}).catch(err => console.log(err));

module.exports = {
  dsp,
  mgSync
}

