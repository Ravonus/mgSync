global.config = require('./config/config');

//Connect to dsp database

require('./controllers/sequelize');

const Accounts = require('./models/Accounts');

Accounts.read({}, (err, data) => {
    
})