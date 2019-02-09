const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');

const Chars = sequelize.define('chars', {
    
  charid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  accid: {
    type: Sequelize.INTEGER
  },
  charname: {
    type: Sequelize.STRING
  },
  nation: {
    type: Sequelize.INTEGER
  },
  pos_zone: {
    type: Sequelize.INTEGER
  },
  pos_prevzone: {
    type: Sequelize.INTEGER
  },
  pos_rot: {
    type: Sequelize.INTEGER
  },
  pos_x: {
    type: Sequelize.INTEGER
  },
  pos_y: {
    type: Sequelize.INTEGER
  },
  pos_z: {
    type: Sequelize.INTEGER
  },
  moghouse: {
    type: Sequelize.INTEGER
  },
  boundary: {
    type: Sequelize.INTEGER
  },
  home_zone: {
    type: Sequelize.INTEGER
  },
  home_rot: {
    type: Sequelize.INTEGER
  },
  home_x: {
    type: Sequelize.INTEGER
  },
  home_y: {
    type: Sequelize.INTEGER
  },
  home_z: {
    type: Sequelize.INTEGER
  },
  playtime: {
    type: Sequelize.INTEGER
  },
  gmlevel: {
    type: Sequelize.INTEGER
  },
  mentor: {
    type: Sequelize.INTEGER
  },
  campaign_allegiance: {
    type: Sequelize.INTEGER
  },
  isstylelocked: {
    type: Sequelize.INTEGER
  },
  nnameflags: {
    type: Sequelize.INTEGER
  },
  moghancement: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false});


  module.exports = {

    Chars,
    
    read:crud.readCreate(Chars)
  
  }