const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const moment = require('moment');


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const Auction_House = sequelize.define('auction_house', {
    
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  itemid: {
    type: Sequelize.INTEGER
  },  
    stack: {
    type: Sequelize.INTEGER
  },  
  seller: {
    type: Sequelize.INTEGER
  },
  seller_name: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  },
  buyer_name: {
    type: Sequelize.STRING
  },
  sale: {
    type: Sequelize.STRING
  },
  sale_date: {
    type: Sequelize.INTEGER
  }
}, {timestamps: false, freezeTableName:true});

module.exports = {

    Auction_House,

    updateAH: async (seller, seller_name, update) => {

        var ahArr = [];

        await asyncForEach(Object.keys(update), async (ah) => {

            await asyncForEach(update[ah], async unit => {

                date = await moment().subtract(unit.on,'d').unix();
                ahArr.push({seller, itemid: ah, date, seller_name, price:unit.price,stack:0})
            })
    }) 

    

    Auction_House.bulkCreate(
            ahArr
        )
        .catch(function(err) {
            // print the error details
         //   console.log(err);
        });

    },
    removeAH: async (seller, _cb) => {

      Auction_House.destroy(
        {
            where: {
                seller
            }
        }).then( data => _cb(null, data)).catch( err => _cb(err))
    }
}