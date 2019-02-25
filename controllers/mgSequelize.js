const Sequelize = require('sequelize');
module.exports = sequelize = new Sequelize("mgSync", config.dsp['mysql-user'], config.dsp['mysql-password'], {
    host: config.dsp['mysql-host'],
    dialect: "mysql",
    operatorsAliases: false, logging: false
});

sequelize.query("CREATE TABLE IF NOT EXISTS `users` (`accid` int(11) NULL, `username` varchar(16) NULL UNIQUE, `email` varchar(200) NULL UNIQUE, `verified` int(1) NOT NULL default '0', `permissions` INT(8) NOT NULL default '1', `groups` INT(11) null, `status` INT(11) NOT NULL default '1', PRIMARY KEY (`accid`));")
    .then(data => {

    });