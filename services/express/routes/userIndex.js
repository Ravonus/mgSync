const fs = require('fs'),
    path = require('path');

var pathSet = '/';
let page = '';
let models = {};

let dirs = fs.readdirSync(path.join(__dirname, '../../../models/mgSync'));
async function asyncCheck() {
    await Functions.asyncForEach(dirs, (dir, index) => {
        if (dir.substring(dir.length - 3) === '.js') {
            models[dir.slice(0, -3)] = require(path.join(__dirname, '../../../models/mgSync', dir));
        }
    });

    let users = await models.Users.read({}).catch(e => {});
    if(users) {
        page = 'pages/userIndex';
        require('../apiRoutes/registration');
        require('../apiRoutes/verify');
        require('../apiRoutes/characters');
        require('../apiRoutes/me');
    } else {  

        page = 'pages/setupAdmin';
        require('../apiRoutes/createAdmin');
    }
}
asyncCheck();

module.exports = {
    route: (req, res) => {
        res.render(page, { title: 'title' });
    },
    path: pathSet
}