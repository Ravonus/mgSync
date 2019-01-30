const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Item_Basic = sequelize.define('item_basic', {

  itemId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }

}, { timestamps: false, freezeTableName: true });

module.exports = {

  Item_Basic,

  grabId: async (name, _cb) => {
    await Item_Basic.findAll({
      where: {
        name
      }
    }).then(item => {
      if (item.length > 0) return _cb(null, item[0]);
      return _cb({ err: 'Item ID could not be found.' });
    }).catch(err => {
      return _cb({ err: err });
    });

  },
  read: (obj, _cb) => {
    if(typeof obj === "function") {
      _cb = obj;
      obj = {};
    }
    Item_Basic.findAll(obj).then(item => {
      if (item.length > 0) return _cb(null, item);
      return _cb({ err: 'Item ID could not be found.' });
    }).catch(err => {
      return _cb({ err: err });
    });
  }

}