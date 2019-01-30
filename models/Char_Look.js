const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Char_Look = sequelize.define('char_look', {
    
  charid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  face: {
    type: Sequelize.INTEGER
  },
  race: {
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.INTEGER
  },
  head: {
    type: Sequelize.INTEGER
  },
  body: {
    type: Sequelize.INTEGER
  },
  hands: {
    type: Sequelize.INTEGER
  },
  legs: {
    type: Sequelize.INTEGER
  },
  feet: {
    type: Sequelize.INTEGER
  },
  main: {
    type: Sequelize.INTEGER
  },
  sub: {
    type: Sequelize.INTEGER
  },
  ranged: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false, freezeTableName:true});

module.exports = {

  Char_Look,

  removeLook: async (charid) => 
  {

    var update = {
      head: 0,
      body: 0,
      hands: 0,
      legs: 0,
      feet: 0,
      main: 0,
      head: 0,
      sub: 0,
      ranged: 0
    }
  
    Char_Look.update(
      update, {
      where: {
        charid
      }
  });

  }

}