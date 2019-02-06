const chalk = require('chalk'),
    objClone = require('./objClone'),
    fs = require('fs'),
    { promisify } = require('util'),
    messages = require('../config/messages.json');

let color,
    close = false,
    l = console.log,
    c = process.exit;

fs.mkdir = promisify(fs.mkdir);
fs.readFile = promisify(fs.readFile);

//type, close, log
let messenger = async (options, values, extras) => {

    if (values && !Array.isArray(values)) extras = values;
    var dt = new Date();
    var ts = dt.toLocaleString()

    if (typeof options === 'string') {

        options = objClone(messages[options]);

        let template = options;
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
                options.msg = options.msg.replace(/\[(val.*?)\]/, values[index]);
                options = template;
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
        var obj = { [Date.now()]: { timestamp: ts, msg: options.msg, extras } }
    } else {
        var obj = { [Date.now()]: { timestamp: ts, msg: options.msg } };
    }

    function fileCheck(path) {
        if (fs.existsSync(path)) {
            return true;
        }
        return false;
    }
    let fullPath;

    if (options.path) {
        let dir = await fs.readdir(options.path).catch(e => { });
        if (!dir) await fs.mkdir(options.path);
        fullPath = `${options.path}${options.type}.log`;
    } else {
        let dir = await fs.readdir('./logs').catch(e => { });
        if (!dir) await fs.mkdir('./logs');
        fullPath = `./logs/${options.type}.log`;
    }

    switch (options.log) {
        case 3:

            if (fileCheck(fullPath)) {
                console.log('MY FULL PATH', fullPath)
                var file = await fs.readFile(fullPath, 'utf8').catch(e => console.log(e));
                console.log('MY FILE', file.length)
                file = JSON.parse(file);
                if (file[Object.keys(obj)]) {
                    file[Object.keys(obj)].push(obj[Object.keys(obj)]);
                } else {
                    file[Object.keys(obj)[0]] = [obj[Object.keys(obj)]]
                }
                file = JSON.stringify(file, null, 4);
                await fs.writeFileSync(fullPath, file);
            } else {
                var json = JSON.stringify(obj);
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
