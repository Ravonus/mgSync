
const config = require('../config/scripts/config'),
  Sequelize = require('sequelize');
module.exports = sequelize = new Sequelize(config.dsp['mysql-db'], config.dsp['mysql-user'], config.dsp['mysql-password'], {
  host: config.dsp['mysql-host'],
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false, logging: false

});

sequelize
  .authenticate()
  .then(() => {
    if (config.express.signUp) sequelizeMgNewFunc();
  })
  .catch(err => {
    console.log(err);
    if (err.original.sqlMessage) log({ err: err.original.sqlMessage, type: 'error' });
    log(`reachMysql`, [err.original.hostname])
  });

function sequelizeMgNewFunc() {
  const sequelizeMgNew = new Sequelize("", config.dsp['mysql-user'], config.dsp['mysql-password'], {
    host: config.dsp['mysql-host'],
    dialect: "mysql",
    operatorsAliases: false, logging: false
  });
  sequelizeMgNew.query("CREATE DATABASE `mgSync`;").then(data => {
    //log here
    sequelizeMgFunc()
  }).catch(e => { sequelizeMgFunc() });
}

function sequelizeMgFunc() {
  const sequelizeMg = new Sequelize("mgSync", config.dsp['mysql-user'], config.dsp['mysql-password'], {
    host: config.dsp['mysql-host'],
    dialect: "mysql",
    operatorsAliases: false, logging: false
  });

  sequelizeMg.query("CREATE TABLE IF NOT EXISTS `users` (`accid` int(11) NULL, `username` varchar(16) NULL, `email` varchar(200) NULL, `verified` int(1) NOT NULL default '0', `permissions` INT(8) NOT NULL default '1', `groups` INT(11) null, `status` INT(11) NOT NULL default '1');")
    .then(data => {

    })
}