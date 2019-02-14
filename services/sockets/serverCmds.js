const fs = require('fs'),
    { promisify } = require('util');

fs.readFile = promisify(fs.readFile);


socket.on('dspOff', (options) => {
    log('turnOff');
});


socket.on('confLoad', async (options) => {
    var stringArray = []
    await Functions.asyncForEach(dspConfFiles, async (file) => {
        if(file.includes('.conf')) {
        let contents = await fs.readFile(`${config.dsp['conf-dir']}/${file}`, 'utf8').catch(e => log(e));
        let noComment = contents.replace(/#.*$|^\/\/.*$/gm, '');
        let string = ['breakType:' + file.replace('.conf', '')];
        if (await file.includes('server_message')) {
            string.push(file.replace('.conf', '') + ': ' + noComment);
            stringArray = [...stringArray, ...string];
        } else {

            matches = noComment.match(/^(.*?):.*$/gm);
            if (!matches) {
                matches = [noComment];
            }
            stringArray = [...stringArray, ...string, ...matches];
        }

    }
    });

    log('dspConfFiles', [dspConfFiles], { username: options.username });
    let conf = {}
    let lastBreak = '';
    await Functions.asyncForEach(stringArray, async (string) => {
        let variable = await string.substr(0, string.indexOf(':'));
        let text = await string.substr(string.indexOf(':') + 1);

        if (variable === 'breakType'.trim()) {
            lastBreak = text.trim();
            conf[lastBreak] = {};
        } else {
            if (lastBreak === 'search_server') {

            }

            conf[lastBreak][variable] = text.trim();
        }
    });

    socket.emit('confLoaded', { data: conf, clientid: options.clientid });

});

socket.on('updateConf', async (options) => {

    await Functions.asyncForEach(options.updates, async (conf) => {
        let reg = conf.key + ':(.*)'
        let re = new RegExp(reg);
        let contents = await fs.readFile(`${config.dsp['conf-dir']}/${conf.configFile}.conf`, 'utf8').catch(e => log(e));
        if (conf.configFile.includes('server_message')) {
            await fs.writeFileSync(`${config.dsp['conf-dir']}/${conf.configFile}.conf`, conf.value)
        } else {
            let newContents = await contents.replace(re, `${conf.key}:\t${conf.value}`);
            await fs.writeFileSync(`${config.dsp['conf-dir']}/${conf.configFile}.conf`, newContents)
        }
        log('updateConf', [conf.key, conf.value, conf.configFile], { security: options.security, type: options.updateConf, username: options.username });

    });

});