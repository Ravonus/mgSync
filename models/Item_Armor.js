const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Item_Armor = sequelize.define('item_armor', {
    
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }

}, {timestamps: false, freezeTableName:true});



module.exports = {

    Item_Armor,

    grabId: async (name, _cb) => {
        await Item_Armor.findAll({
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