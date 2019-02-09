const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');

const Item_Latents = sequelize.define('item_latents', {
    
  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }

}, {timestamps: false, freezeTableName:true});

module.exports = {

    Item_Latents,

    grabId: async (name, _cb) => {
        await Item_Latents.findAll({
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