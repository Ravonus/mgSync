const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const Op = Sequelize.Op;

const { promisify } = require('util');


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

    Char_Inventory,

    updateExtra: (charid, signature) => {

        console.log('ran', signature)
        
        Char_Inventory.findAll({
            where: {
                signature:signature.trim(),
                itemId: {
                    [Op.between]: [513, 515]
                },
                charid: {
                    [Op.not]: charid
                }

            }
        }).then(item => {
            console.log('item', item[0].extra, signature)
            Char_Inventory.update(
                {extra:item[0].extra},
                {
                where: {
                    signature,
                    itemId: {
                        [Op.between]: [513, 515]
                    },
                    charid
    
                }
            })
   
        }).catch( (err) => {
            console.log('TES', err)
            Char_Inventory.update(
                {extra:Buffer.from('0200000000003'+Math.floor(Math.random()*16777215).toString(16)+'4804d3ce17f000000000000000000', 'hex')},
                {
                where: {
                    signature,
                    itemid:[513, 515]
,
                    charid
    
                }
            })

        });

    },

    updateChar: async (id, update) => {

        var lsBin = await fs.readFile('./ls.bin').catch((err) => { console.log(err) });

        lsBin = Buffer.from('0200000000003'+Math.floor(Math.random()*16777215).toString(16)+'4804d3ce17f000000000000000000', 'hex');

        console.log(lsBin);


        var itemsArr = [];

        //   console.log('SPOOKY', update);
        function locationIdFunction(storageName) {

            switch (storageName) {
                case 'Inventory':
                    var invid = 0;
                    break;
                case 'Mog safe':
                    var invid = 1;
                    break;
                case 'Storage':
                    var invid = 2;
                    break;
                case 'notsureyet':
                    var invid = 3;
                    break;
                case 'Mog Locker':
                    var invid = 4;
                    break;
                case 'Mog Satchel':
                    var invid = 5;
                    break;
                case 'Mog Sack':
                    var invid = 6;
                    break;
                case 'Mog Case':
                    var invid = 7;
                    break;
                case 'Mog Wardrobe':
                    var invid = 8;
                    break;
                case 'Mog Safe 2':
                    var invid = 9;
                    break;
                case 'Mog Wardrobe 2':
                    var invid = 10;
                    break;
                case 'Mog Wardrobe 3':
                    var invid = 11;
                    break;
                case 'Mog Wardrobe 4':
                    var invid = 12
                default:
                    var invid = 0;
                    break;
            }

            return invid;

        }

        if (update && typeof update === 'object') {

            var isDone = 0;
            Object.keys(update).forEach((inv, index) => {

                var items = 0;
                var obj = {};

                Object.keys(update[inv]).forEach((itemKey, index1) => {



                    if (update[inv][itemKey]) {
                        update[inv][itemKey].forEach((itemArr, index2) => {
                            var ls = false;

                            switch (items) {
                                case 0:
                                    //       console.log(locationIdFunction(inv) , 'and', Object.keys(update).length  + Object.keys(update[inv]).length + update[inv][itemKey].length)             

                                    obj = {
                                        charid: id,
                                        location: locationIdFunction(inv),
                                        itemId: itemKey,
                                        quantity: itemArr
                                    }

                                    // //linkpearl (OWNER)
                                    // if (Number(itemKey) === 513) {
                                    //     obj.extra = lsBin;
                                    //     ls = true;
                                    // }

                                    // //pearlsack (OFFICER)
                                    // if (Number(itemKey) === 514) {
                                    //     obj.extra = lsBin;
                                    //     ls = true;
                                    // }

                                    // //Linkshell (MEMBER)
                                    // if (Number(itemKey) === 515) {
  
                                    //     obj.extra = lsBin;
                                    //     ls = true;
                                    // }

                                    //      console.log('Q', locationIdFunction(inv), update[inv][itemKey][index])
                                    items = 1
                                    break;
                                case 1:
                                    //  console.log('B', itemKey, update[inv][itemKey][index])
                                    obj.bazaar = itemArr;
                                    items = 2
                                    break;
                                case 2:

                              

                                    // //Linkshell (MEMBER)
                                    if (Number(itemKey) >= 513 &&  Number(itemKey) <=515) {
  
                                    //    obj.extra = lsBin;
                   
                                        
                                        var lsPush = {
                                            name:itemArr,
                                            color: Math.floor(Math.random() * (+65535 - +61440) + +61440),
                                        }
                                        require('./Linkshells').create(lsPush, lsBin, id);
                                    }

                                    
                                    obj.signature = itemArr;
                                    // console.log('Sig', itemKey, update[inv][itemKey][index])
                                    items++
                                    break;

                                default:

                                    obj.slot = itemArr;

                                    itemsArr.push(obj);
                                    obj = {};




                                    //  console.log('Position', itemKey, update[inv][itemKey][index])
                                    items = 0;
                                    break;
                            }


                            if (index === Object.keys(update).length - 1 && index1 === Object.keys(update[inv]).length - 1 && index2 === update[inv][itemKey].length - 1) {

                                // itemsArr.forEach( (item) => {

                                Char_Inventory.bulkCreate(
                                    itemsArr, { returning: true, individualHooks: true }
                                )
                                    .catch(function (err) {
                                        // print the error details
                                        //   console.log(err);
                                    });

                                // });

                            }

                            //     console.log(itemKey, itemArr);
                        });

                        isDone++;


                    }
                });
                //     jobs[jobNameFunction(job)] = update[job];
                //     if (index >= Object.keys(update).length - 1) {
                //         Char_Inventory.update(
                //             jobs, {
                //                 where: {
                //                     charid: id
                //                 }
                //             });
                //     }
            });
        }

    },
    remove(charid, _cb) {
        //    console.log('RAN FOOL');
        Char_Inventory.destroy(
            {
                where: {
                    charid
                }
            }).then(data => _cb(null, data)).catch(err => _cb(err))

    }

}