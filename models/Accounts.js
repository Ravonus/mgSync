const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const Accounts = sequelize.define('accounts', {
    
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  email2: {
    type: Sequelize.STRING
  },
  timecreate: {
    type: Sequelize.DATE
  },
  timelastmodify: {
    type: Sequelize.DATE
  },
  content_ids: {
    type: Sequelize.INTEGER
  },
  expansions: {
    type: Sequelize.INTEGER
  },
  features: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.INTEGER
  },
  priv: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false});


module.exports = {

  Accounts,
  read:crud.readCreate(Accounts)

}