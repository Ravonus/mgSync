const Sequelize = require('sequelize');
module.exports = sequelize = new Sequelize("mgSync", config.dsp['mysql-user'], config.dsp['mysql-password'], {
    host: config.dsp['mysql-host'],
    dialect: "mysql",
    operatorsAliases: false, logging: false
});

sequelize.query("CREATE TABLE IF NOT EXISTS `users` (`accid` int(11) NULL, `username` varchar(16) NULL UNIQUE, `email` varchar(200) NULL UNIQUE, `verified` varchar(32) NOT NULL default '', `permissions` INT(8) NOT NULL default '1', `groups` INT(11) null, `status` INT(11) NOT NULL default '1', PRIMARY KEY (`accid`));");
sequelize.query("CREATE TABLE IF NOT EXISTS `groups` (`id` int(11) NULL UNIQUE, `name` varchar(32) NULL UNIQUE, PRIMARY KEY (`id`));").then(data => {
    if (data[0].warningStatus === 0) {
        const Groups = require('../models/mgSync/Groups');
        let obj = {
            id: 1,
            name: 'administrators'
        }
        let obj2 = {
            id: 2,
            name: 'moderators'
        }
        let obj3 = {
            id: 4,
            name: 'users'
        }
        console.log(Groups);
        Groups.create([obj, obj2, obj3], 'bulkCreate');
    }
});

