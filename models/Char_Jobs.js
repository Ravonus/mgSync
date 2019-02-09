const Sequelize = require('sequelize'),

path = require('path'),
sequelize = require(path.join(__dirname, '../controllers/sequelize')),
{ promisify } = require('util');

const Char_Jobs = sequelize.define('char_jobs', {

    charid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    unlocked: {
        type: Sequelize.INTEGER
    },
    genkai: {
        type: Sequelize.INTEGER
    },
    war: {
        type: Sequelize.INTEGER
    },
    mnk: {
        type: Sequelize.INTEGER
    },
    whm: {
        type: Sequelize.INTEGER
    },
    blm: {
        type: Sequelize.INTEGER
    },
    rdm: {
        type: Sequelize.INTEGER
    },
    thf: {
        type: Sequelize.INTEGER
    },
    pld: {
        type: Sequelize.INTEGER
    },
    drk: {
        type: Sequelize.INTEGER
    },
    bst: {
        type: Sequelize.INTEGER
    },
    brd: {
        type: Sequelize.INTEGER
    },
    rng: {
        type: Sequelize.INTEGER
    },
    sam: {
        type: Sequelize.INTEGER
    },
    nin: {
        type: Sequelize.INTEGER
    },
    drg: {
        type: Sequelize.INTEGER
    },
    smn: {
        type: Sequelize.INTEGER
    },
    nin: {
        type: Sequelize.INTEGER
    },
    drg: {
        type: Sequelize.INTEGER
    },
    smn: {
        type: Sequelize.INTEGER
    },
    blu: {
        type: Sequelize.INTEGER
    },
    cor: {
        type: Sequelize.INTEGER
    },
    pup: {
        type: Sequelize.INTEGER
    },
    dnc: {
        type: Sequelize.INTEGER
    },
    sch: {
        type: Sequelize.INTEGER
    },
    geo: {
        type: Sequelize.INTEGER
    },
    run: {
        type: Sequelize.INTEGER
    }

}, { timestamps: false });

function jobNameFunction(job) {

    switch (job) {
        case 'Warrior':
            var jobName = 'war';
            jobs.unlocked = jobs.unlocked + 2;
            break;
        case 'Monk':
            var jobName = 'mnk';
            jobs.unlocked = jobs.unlocked + 4;
            break;
        case 'White Mage':
            var jobName = 'whm';
            jobs.unlocked = jobs.unlocked + 8;
            break;
        case 'Black Mage':
            var jobName = 'blm';
            jobs.unlocked  = jobs.unlocked + 16;
            break;
        case 'Red Mage':
            var jobName = 'rdm';
            jobs.unlocked = jobs.unlocked  + 32;
            break;
        case 'Thief':
            var jobName = 'thf';
            jobs.unlocked = jobs.unlocked + 64;
            break;
        case 'Paladin':
            var jobName = 'pld';
            jobs.unlocked = jobs.unlocked + 128;
            break;
        case 'Dark Knight':
            var jobName = 'drk';
            jobs.unlocked = jobs.unlocked + 256;
            break;
        case 'Beastmaster':
            var jobName = 'bst';
            jobs.unlocked = jobs.unlocked + 512;
            break;
        case 'Bard':
            var jobName = 'brd';
            jobs.unlocked = jobs.unlocked + 1024;
            break;
        case 'Ranger':
            var jobName = 'rng';
            jobs.unlocked = jobs.unlocked + 2048;
            break;
        case 'Samurai':
            var jobName = 'sam';
            jobs.unlocked = jobs.unlocked + 4096;
            break;
        case 'Ninja':
            var jobName = 'nin';
            jobs.unlocked = jobs.unlocked + 8192;
            break;
        case 'Dragoon':
            var jobName = 'drg';
            jobs.unlocked = jobs.unlocked + 16384;
            break;
        case 'Summoner':
            var jobName = 'smn';
            jobs.unlocked = jobs.unlocked + 32768;
            break;
        case 'Blue Mage':
            var jobName = 'blu';
            jobs.unlocked = jobs.unlocked + 65536;
            break;
        case 'Corsair':
            var jobName = 'cor';
            jobs.unlocked = jobs.unlocked + 131072;
            break;
        case 'Puppetmaster':
            var jobName = 'pup';
            jobs.unlocked = jobs.unlocked + 262144;
            break;
        default:
            var jobName = undefined;
            break;
    }

    return jobName;
}

module.exports = {

    read:crud.readCreate(Char_Jobs),
    Char_Jobs,
    
}