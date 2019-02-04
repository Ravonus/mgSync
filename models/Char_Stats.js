const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Char_Stats = sequelize.define('char_stats', {

    charid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    hp: {
        type: Sequelize.INTEGER
    },
    mp: {
        type: Sequelize.INTEGER
    },
    nameflags: {
        type: Sequelize.INTEGER
    },
    mhflag: {
        type: Sequelize.INTEGER
    },
    mjob: {
        type: Sequelize.INTEGER
    },
    sjob: {
        type: Sequelize.INTEGER
    },
    death: {
        type: Sequelize.INTEGER
    },
    '2h': {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.INTEGER
    },
    bazaar_message: {
        type: Sequelize.STRING
    },
    zoning: {
        type: Sequelize.INTEGER
    },
    mlvl: {
        type: Sequelize.INTEGER
    },
    slvl: {
        type: Sequelize.INTEGER
    },
    pet_id: {
        type: Sequelize.INTEGER
    },
    pet_type: {
        type: Sequelize.INTEGER
    },
    pet_hp: {
        type: Sequelize.INTEGER
    },
    pet_mp: {
        type: Sequelize.INTEGER
    }

}, { timestamps: false });

module.exports = {

    Char_Stats,

    updateChar: (id, job, subJob) => {

        function jobFunction(job) {
        
            switch (job) {
                case 'Warrior':
                    var jobId = 1;
                    break;
                case 'Monk':
                    var jobId = 2;
                    break;
                case 'White Mage':
                    var jobId = 3;
                    break;
                case 'Black Mage':
                    var jobId = 4;
                    break;
                case 'Red Mage':
                    var jobId = 5;
                    break;
                case 'Thief':
                    var jobId = 6;
                    break;
                case 'Paladin':
                    var jobId = 7;
                    break;
                case 'Dark Knight':
                    var jobId = 8;
                    break;
                case 'Beast Master':
                    var jobId = 9;
                    break;
                case 'Bard':
                    var jobId = 10;
                    break;
                case 'Ranger':
                    var jobId = 11;
                    break;
                case 'Samuri':
                    var jobId = 12;
                    break;
                case 'Ninja':
                    var jobId = 13;
                    break;
                case 'Dragoon':
                    var jobId = 14;
                    break;
                case 'Summoner':
                    var jobId = 15;
                    break;
                case 'Blue Mage':
                    var jobId = 16;
                    break;
                case 'Corsair':
                    var jobId = 17;
                    break;
                case 'Puppetmaster':
                    var jobId = 18;
                    break;
                default:
                    var jobId = 0;
                    break;
            }

            return jobId;
        }
        
        var jobId = jobFunction(Object.keys(job)[0]);

        update = {
            mjob: jobId,
            mlvl: job[Object.keys(job)]
        }

        if (subJob) {

            var subJobId = jobFunction(Object.keys(subJob)[0]);

            update.sjob = subJobId;
            update.slvl = subJob[Object.keys(subJob)]
        }

        Char_Stats.update(
            update, {
                where: {
                    charid: id
                }
            });
    }

}