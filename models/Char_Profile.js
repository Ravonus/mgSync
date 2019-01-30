const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Char_Profile = sequelize.define('char_profile', {
    
  charid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  rank_points: {
    type: Sequelize.INTEGER
  },
  rank_sandoria: {
    type: Sequelize.INTEGER
  },
  rank_bastok: {
    type: Sequelize.INTEGER
  },
  rank_windurst: {
    type: Sequelize.INTEGER
  },
  rank_sandoria: {
    type: Sequelize.INTEGER
  },
  fame_sandoria: {
    type: Sequelize.INTEGER
  },
  fame_basktok: {
    type: Sequelize.INTEGER
  },
  fame_windurst: {
    type: Sequelize.INTEGER
  },
  fame_norg: {
    type: Sequelize.INTEGER
  },
  fame_jeuno: {
    type: Sequelize.INTEGER
  },
  fame_aby_konschtat: {
    type: Sequelize.INTEGER
  },
  fame_aby_tahrongi: {
    type: Sequelize.INTEGER
  },
  fame_aby_latheine: {
    type: Sequelize.INTEGER
  },
  fame_aby_misareaux: {
    type: Sequelize.INTEGER
  },
  fame_aby_vunkerl: {
    type: Sequelize.INTEGER
  },
  fame_aby_attohwa: {
    type: Sequelize.INTEGER
  },
  fame_aby_altepa: {
    type: Sequelize.INTEGER
  },
  fame_aby_grauberg: {
    type: Sequelize.INTEGER
  },
  fame_aby_uleguerand: {
    type: Sequelize.INTEGER
  },
  fame_adoulin: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false, freezeTableName:true});

  module.exports = {

    Char_Profile,
  
    updateChar: (id, update) => 
    {
    
      Char_Profile.update(
        update, {
        where: {
          charid: id
        }
    });

    }
  
  }