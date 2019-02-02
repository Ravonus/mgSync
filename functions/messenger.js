const chalk = require('chalk'),
    fs = require('fs');

let color;
let close = false;
let l = console.log;
let c = process.exit;

let messages = require('../config/messages.json');

//type, close, log
let messenger = async (options, values) => {

    var dt = new Date();
    var ts = dt.toLocaleString()

    if (typeof options === 'string') {
        options = messages[options];
        
        let configVars = options.msg.match(/\${(.*?)}/g);

        if (configVars) {
            configVars.forEach((v) => {
                let str = v.substring(2).slice(0, -1);
                var seperate = str.split('.');
                options.msg = options.msg.replace(/\${(.*?)}/, config[seperate[0]][seperate[1]])
            });
        }

        let configValues = options.msg.match(/\[(.*val)]/g);

        if (configValues) {
            configValues.forEach((v, index) => {
                options.msg = options.msg.replace(/\[(.*val)]/, values[index])
            });
        }

    }

    switch (options.type) {
        case 'success':
            color = 'green';
            break;
        case 'info':
            color = 'blue';
            break;
        case 'error':
            color = 'redBright';
            options.close = true;
            break;
        default:
            color = 'yellowBright';
            break;
    }

    switch (options.log) {
        case 3:
            await fs.appendFileSync(`./logs/${options.type}.log`, `[ ${ts} ] ${options.msg}\r\n`);
            l(chalk.bold[color](`${chalk.grey(`[ ${ts} ]`)} ${options.msg}`));
            break;
        case 2:
            await fs.appendFileSync(`./logs/${options.type}.log`, `[ ${ts} ] ${options.msg}\r\n`);
            break;
        case 1:
             l(chalk.bold[color](`${chalk.grey(`[ ${ts} ]`)} ${options.msg}`));
            break;
        default:
            break;
    }

    if (options.close) c();

}

module.exports = messenger;
