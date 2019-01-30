const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');
var Duration = require("duration");

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
  
    char: (accid, charname, _cb) => {

        Chars.findAll({
            where: {
              accid,
              charname
            }
          }).then(char => {
            if(char.length > 0) return _cb(null, char);
            return _cb({err:'Cheeko character not found.'});
            }).catch(err => {
                _cb(err);
            });
    },
    get: (accid , _cb) => {

      Chars.findAll({
          where: {
            accid
          }
        }).then(char => {
          console.log(char);
          if(char.length > 0) return _cb(null, char);
          return _cb({err:'Cheeko character not found.'});
          }).catch(err => {
              _cb(err);
          });
  },

    updateChar: (id, update) => 
    {
     
     
      var dates = update.playTime.match(/[0-9]+/g);
      var days = dates[0] * 24 * 3600;
      var hours = dates[1] * 3600;
      var minutes = dates[2] * 60;
      var seconds = parseInt(dates[3]);

      dates = days + hours + minutes + seconds;

      Chars.update({
        nation: update.nation,
        pos_zone: update.pos_zone,
        home_zone: update.home_zone,
        pos_x: 0,
        pos_y: 0,
        pos_z: 0,
        pos_rot: 255,
        home_x: 0,
        home_y: 0,
        home_z: 0,
        home_rot: 255,
        playtime: dates

      }, {
        where: {
          charid: id
        }
    });

    }
  
  }