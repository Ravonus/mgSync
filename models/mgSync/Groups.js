const Sequelize = require('sequelize');
path = require('path'),
sequelize = require(path.join(__dirname, '../../controllers/mgSequelize'));

const Groups = sequelize.define('groups', {
    
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {timestamps: false, freezeTableName:true});

module.exports = {
    Groups,
    read:crud.readCreate(Groups),
    create:crud.createCreate(Groups),
    update:crud.updateCreate(Groups)
}