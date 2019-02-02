const fs = require('fs'),
    { promisify } = require('util');

fs.readFile = promisify(fs.readFile);

socket.on('dspOff', () => {
    log('turnOff');
});

socket.on('confLoad', async () => {
    var stringArray = []
    await Functions.asyncForEach(dspConfFiles, async (file) => {
        let contents = await fs.readFile(`${config.dsp['conf-dir']}/${file}`, 'utf8').catch(e => log(e));
        let noComment = contents.replace(/#.*$|^\/\/.*$/gm);
        let string = ['breakType:' + file.replace('.conf', '')];
        if (await file.includes('server_message')) {
            string.push(file.replace('.conf', '') + ': ' + noComment.match(/^(.*?):.*$/gm)[0]);
            stringArray = [...stringArray, ...string];
        } else {

            matches = noComment.match(/^(.*?):.*$/gm);
            stringArray = [...string, ...stringArray, ...matches];
        }
        log({msg:`${file} configuration was loaded.`, type:'info', log:3})
    });
    let conf = {}
    let lastBreak = '';
    await Functions.asyncForEach(stringArray, async (string) => {
        let variable = await string.substr(0, string.indexOf(':'));
        let text = await string.substr(string.indexOf(':') + 1);
        if (variable === 'breakType'.trim()) {
            lastBreak = text.trim();
            conf[lastBreak] = {};
        } else {
            conf[lastBreak][variable] = text.trim();
        }
    });

    
    socket.emit('confLoaded', conf);

});