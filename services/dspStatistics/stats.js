const fs = require('fs'),
    path = require('path');

let count = '';
let files = '';
module.exports = (stats, application) => {
    Object.keys(stats).forEach(async (pid, index) => {
        let dir = path.join(__dirname, `${application[index]}/seconds.json`);
        
        if (typeof files === 'string') {
            count = {};
            application.forEach((app) => {
                count[app] = 0;
            });
            files = await require(dir);
        }

        if (files.length > 60 / (config.dsp.processPollingTime / 1000)) {
            files[count[application[index]]] = stats[pid];
            count[application[index]]++;

            if (count[application[index]] > 60 / (config.dsp.processPollingTime / 1000)) {

                count[application[index]] = 0;
                await fs.writeFileSync(path.join(__dirname, `${application[index]}/seconds.json`), JSON.stringify(files, null, 4));
            }
        } else {
            files.push(stats[pid]);

            await fs.writeFileSync(path.join(__dirname, `${application[index]}/seconds.json`), JSON.stringify(files, null, 4));

        }

    });
}