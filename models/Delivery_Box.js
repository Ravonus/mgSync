const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const Delivery_Box = sequelize.define('delivery_box', {

    charid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    charname: {
        type: Sequelize.STRING
    },
    box: {
        type: Sequelize.INTEGER
    },
    slot: {
        type: Sequelize.INTEGER
    },
    itemid: {
        type: Sequelize.INTEGER
    },
    itemsubid: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    senderid: {
        type: Sequelize.INTEGER
    },
    sender: {
        type: Sequelize.STRING
    },
    received: {
        type: Sequelize.INTEGER
    },
    sent: {
        type: Sequelize.INTEGER
    }
}, { timestamps: false, freezeTableName: true });

module.exports = {

    Delivery_Box,

    

    updateDB:  (update) => {

   //    console.log(update, 'dey see mey updating');

        Delivery_Box.bulkCreate(
            update
        )
        .catch(function(err) {
            // print the error details
         //   console.log(err)
     
        });

    },
    removeDB: async (charid, _cb) => {

        Delivery_Box.destroy(
          {
              where: {
                  charid
              }
          }).then( data => _cb(null, data)).catch( err => _cb(err))
      }

}