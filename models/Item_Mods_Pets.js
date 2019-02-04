const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Item_Mods_Pets = sequelize.define('item_mods_pets', {
    
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }

}, {timestamps: false, freezeTableName:true});

module.exports = {

    Item_Mods_Pets,

    grabId: async (name, _cb) => {
        await Item_Mods_Pets.findAll({
            where: {
              name
            }
          }).then(item => {
            if(item.length > 0) return _cb(null, item[0]);
            return _cb({err:'Item ID could not be found.'});
            }).catch(err => {
                return _cb({err:err});
            });
        
    }
    
}