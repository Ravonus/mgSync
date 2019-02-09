const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');

const Zone_Settings = sequelize.define('zone_settings', {
    
  zoneid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  zonetype: {
    type: Sequelize.INTEGER
  },
  zoneip: {
    type: Sequelize.INTEGER
  },
  zoneport: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  music_day: {
    type: Sequelize.INTEGER
  },
  music_night: {
    type: Sequelize.INTEGER
  },
  battlesolo: {
    type: Sequelize.INTEGER
  },
  battlemulti: {
    type: Sequelize.INTEGER
  },
  restriction: {
    type: Sequelize.INTEGER
  },
  tax: {
    type: Sequelize.INTEGER
  },
  misc: {
    type: Sequelize.INTEGER
  }

}, {timestamps: false});


  module.exports = {

    Zone_Settings,
  
    zone: (name,  _cb) => {

     // var name = zonename[0].name;

        Zone_Settings.findAll({
            where: {
              name:[name[0].name,name[1].name]
            }
          }).then(zone => {
       
            if(zone.length > 0) return _cb(null, zone);
            return _cb({err:'Zone from nasomi character not found.'});
            }).catch(err => {
              console.log(err);
                _cb(err);
            });
    }
  
  }