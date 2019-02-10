const fs = require('fs');
const path = require('path');
let lastHour = {};
module.exports = (application, stats) => {

    return new Promise(async (resolve, reject) => {
        
        let cpu = [];
        let memory = [];
        await Functions.asyncForEach(stats, (stat) => {

            cpu.push(stat.cpu);
            memory.push(stat.memory);

        });

        let averageCpu;
        let averageMemory;
        await Functions.average(cpu).then((data) => {
            averageCpu = data;
        });
        await Functions.average(memory).then((data) => {
            averageMemory = data;
        });

        let minutes;
        let push = { averageCpu: averageCpu, averageMemory: averageMemory, elapsed: stats[stats.length - 1].elapsed, timestamp: Date.now() };
        try {
            
            minutes = await fs.readFileSync(path.join(__dirname, application, 'minutes.json'), 'utf8');
            let arr = JSON.parse(minutes);
            arr.push(push);
            if (arr.length < 61) {
                await fs.writeFileSync(path.join(__dirname, application, 'minutes.json'), JSON.stringify(arr, null, 4));
            } else {
                arr.unshift(push);
                arr.length = arr.length - 1;
                await fs.writeFileSync(path.join(__dirname, application, 'minutes.json'), JSON.stringify(arr, null, 4));
                if(!lastHour[application]) {

                      //TODO:look at hours array and check if timestamp has been hour since last time. for now just pushing hour. (If app crashes within hour this will cause slight data issue)
                    lastHour[application] = push.timestamp;
                    resolve(arr);
                } else {
                    if(Date.now() - lastHour[application] > (3600 * 1000) ) {
                        lastHour[application] = push.timestamp;
                        resolve(arr);
                    } else {
                        console.log('WOOT')
                        reject(true);
                    }
                                     
                }
                    
            }

        } catch (e) {
            await fs.writeFileSync(path.join(__dirname, application, 'minutes.json'), JSON.stringify([push]), null, 4);
        }

    });

};