const chalk = require('chalk'),
    fs = require('fs');

let color;
let close = false;
let l = console.log;
let c = process.exit;

let messages = require('../config/messages.json');

//type, close, log
let messenger = async (options, values, extras) => {
    if(values && !Array.isArray(values)) extras = values;
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

        let configValues = options.msg.match(/\[(val.*?)\]/g);

        if (configValues) {
            configValues.forEach((v, index) => {
                options.msg = options.msg.replace(/\[(val.*?)\]/, values[index])
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
            break;
        default:
            color = 'yellowBright';
            break;
    }


    if (extras) {
        var obj = Object.assign({ timestamp: ts, msg: options.msg }, extras);
    } else {
        var obj = { timestamp: ts, msg: options.msg };
    }

    

    function fileCheck(path) {
        if (fs.existsSync(path)) {
            return true;
        }
        return false;
    }
    let fullPath = `./logs/${options.type}.log`;
    switch (options.log) {
        case 3:

            if (fileCheck(fullPath)) {
                var file = await fs.readFileSync(fullPath, 'utf8');
                file = JSON.parse(file);
                file.push(obj);
                file = JSON.stringify(file, null, 4);
                await fs.writeFileSync(fullPath, file);

            } else {
                var json = JSON.stringify([obj]);
                await fs.writeFileSync(fullPath, json);
            }

            l(chalk.bold[color](`${chalk.grey(`[ ${ts} ]`)} ${options.msg}`));
            break;
        case 2:
            await fs.appendFileSync(fullPath, json);
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
