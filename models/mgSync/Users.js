const Sequelize = require('sequelize');
path = require('path'),
sequelize = require(path.join(__dirname, '../../controllers/mgSequelize')),
moment = require('moment');

const Users = sequelize.define('users', {
    
  accid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },  
    email: {
    type: Sequelize.STRING
  },  
  verified: {
    type: Sequelize.STRING
  },
  permissions: {
    type: Sequelize.INTEGER
  },
  groups: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false, freezeTableName:true});

module.exports = {
    Users,
    read:crud.readCreate(Users),
    create:crud.createCreate(Users)
}