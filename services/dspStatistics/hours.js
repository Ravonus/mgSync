const fs = require('fs');
const path = require('path');
module.exports = (application, stats) => {

    return new Promise(async (resolve) => {
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
            minutes = await fs.readFileSync(path.join(__dirname, application, 'hours.json'), 'utf8');
            let arr = JSON.parse(minutes);
            arr.push(push);
            //keep hour timestamps for 1 month total. This is about 4000 lines for each process.
            if (arr.length < 720) {
                await fs.writeFileSync(path.join(__dirname, application, 'hours.json'), JSON.stringify(arr, null, 4));
            } else {
                arr.unshift(push);
                arr.length = arr.length - 2;
                await fs.writeFileSync(path.join(__dirname, application, 'hours.json'), JSON.stringify(arr, null, 4));
                resolve(arr);
            }

        } catch (e) {
            await fs.writeFileSync(path.join(__dirname, application, 'hours.json'), JSON.stringify([push]), null, 4);
        }

    });


}