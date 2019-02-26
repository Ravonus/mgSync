const Sequelize = require('sequelize'),

path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');
const Op = Sequelize.Op;



const fs = require('fs');

fs.readFile = promisify(fs.readFile);


const Char_Inventory = sequelize.define('char_inventory', {

    charid: {
        type: Sequelize.INTEGER,
    },
    location: {
        type: Sequelize.INTEGER
    },
    slot: {
        type: Sequelize.INTEGER
    },
    itemId: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    bazaar: {
        type: Sequelize.INTEGER
    },
    extra: {
        type: Sequelize.BLOB
    },
    signature: {
        type: Sequelize.INTEGER
    }

}, { timestamps: false, freezeTableName: true });


Char_Inventory.removeAttribute('id');

module.exports = {
    read:crud.readCreate(Char_Inventory),
    Char_Inventory

}