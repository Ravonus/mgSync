const fs = require('fs'),
    path = require('path');

let page = 'index';
let models = {};

if(config.express.signUp) {
let dirs = fs.readdirSync(path.join(__dirname, '../../../models/mgSync'));
async function asyncCheck() {
    await Functions.asyncForEach(dirs, (dir, index) => {
        if (dir.substring(dir.length - 3) === '.js') {
            models[dir.slice(0, -3)] = require(path.join(__dirname, '../../../models/mgSync', dir));
        }
    });

    let users = await models.Users.read({}).catch(e => {});

    if(users) {
        page = 'index';
    } else {  
        page = 'pages/setupAdmin';
    }

    
}
asyncCheck();
}



var pathSet = config.express.signUp ? '/dsp' : '/';

module.exports = {
    route: (req, res) => {
        res.render(page, { title: 'title' });
    },
    path: pathSet
}