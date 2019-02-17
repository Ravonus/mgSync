const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const Accounts_Sessions = sequelize.define('accounts_sessions', {
    
  accid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  charid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  targid: {
    type: Sequelize.INTEGER
  },
  linkshellid1: {
    type: Sequelize.INTEGER
  },
  linkshellrank1: {
    type: Sequelize.INTEGER
  },
  linkshellid2: {
    type: Sequelize.INTEGER
  },
  linkshellrank2: {
    type: Sequelize.INTEGER
  },
  session_key: {
    type: Sequelize.INTEGER
  },
  server_addr: {
    type: Sequelize.INTEGER
  },
  server_port: {
    type: Sequelize.INTEGER
  },
  client_addr: {
    type: Sequelize.INTEGER
  },
  client_port: {
    type: Sequelize.INTEGER
  },
  version_mismatch: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false});


module.exports = {

  Accounts_Sessions,
  read:crud.readCreate(Accounts_Sessions),
  delete:crud.deleteCreate(Accounts_Sessions)

}