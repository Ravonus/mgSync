const fs = require('fs'),
    path = require('path');

let count = {};
let files = {};

module.exports = (stats, application) => {
    if(!files[application]) {
        files[application] = ''
    }
    if (!count[application]) {
        count[application] = 0;
    }
    return new Promise(async (resolve, reject) => {
        try {
            await fs.readdirSync(path.join(__dirname, application))
            try{
                await fs.readFileSync(path.join(__dirname, application, 'seconds.json'));
            } catch(e) {
                await fs.writeFileSync(path.join(__dirname, application, 'seconds.json'), '[]');
            }
        } catch(e) {
            await fs.mkdirSync(path.join(__dirname, application));
            await fs.writeFileSync(path.join(__dirname, application, 'seconds.json'), '[]');
        }
        let dir = path.join(__dirname, `${application}/seconds.json`);

        if (typeof files[application] === 'string') {
            count = {};

            count[application] = 0;

            files[application] = await require(dir);
        }

        if (files[application].length > 60 / (config.dsp.processPollingTime / 1000)) {
            files[application][count[application]] = stats;
            count[application]++;

            if (count[application] > 1 / (config.dsp.processPollingTime / 1000)) {

                count[application] = 0;
                resolve(files[application]);
                await fs.writeFileSync(path.join(__dirname, `${application}/seconds.json`), JSON.stringify(files[application], null, 4));
            } else {
                reject(false);
            }
        } else {
            files[application].push(stats);
            if(files[application].length > 59) await fs.writeFileSync(path.join(__dirname, `${application}/seconds.json`), JSON.stringify(files[application], null, 4));

        }

    });

}