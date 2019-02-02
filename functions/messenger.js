const chalk = require('chalk');

let color;
let close = false;
let l = console.log;
let c = process.exit;
let messenger = (msg, type, close) => {

    switch (type) {
        case 'success':
            color = 'green';
            break;
        case 'info':
            color = 'blue';
            break;
        case 'error':
            color = 'redBright';
            close = true;
            break;
        default:
            color = 'yellowBright';
            break;
    }

    l(chalk.bold[color](msg));

    if (close) c();

}

module.exports = messenger;
