const Sequelize = require('sequelize'),
path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');

const Linkshells = sequelize.define('linkshells', {

    name: {
        type: Sequelize.STRING,
        primaryKey: true

    },
    color: {
        type: Sequelize.STRING
    }

}, { timestamps: false });




module.exports = {

    Linkshells,

    create: async (ls, buffer, charid) => {


        Linkshells.findAll({
            where: {
                name: ls.name
            }
        }).then(item => {
            if (item.length === 0) { 
                Linkshells.create(ls).catch(err => {

                 updateExtra({extra:buffer})
            });
        } else {
            require('./Char_Inventory').updateExtra(charid, ls.name);
        }
        }).catch();



    }

}