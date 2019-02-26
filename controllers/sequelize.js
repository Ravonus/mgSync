
const Sequelize = require('sequelize');
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
    require('./mgSequelize');
  }).catch(e => { require('./mgSequelize'); });
}