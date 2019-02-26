const Sequelize = require('sequelize'),

sequelize = require('../controllers/sequelize'),
{ promisify } = require('util');

const Item_Weapon = sequelize.define('item_weapon', {
    
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }

}, {timestamps: false, freezeTableName:true});

module.exports = {

    Item_Weapon,

    grabId: async (name, _cb) => {
        await Item_Weapon.findAll({
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