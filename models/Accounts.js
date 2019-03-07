const Sequelize = require('sequelize'),
  path = require('path'),
  sequelize = require(path.join(__dirname, '../controllers/sequelize'));

const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);

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
    type: TIMESTAMP
  },
  timelastmodify: {
    type: TIMESTAMP
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

}, { timestamps: false });

Accounts.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

module.exports = {

  Accounts,
  read: crud.readCreate(Accounts),
  create: crud.createCreate(Accounts),
  update: crud.updateCreate(Accounts),
  delete:crud.deleteCreate(Accounts)
}