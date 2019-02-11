let secondsFunction = require('./seconds');
let minutesFunction = require('./minutes');
let hoursFunction = require('./hours');
module.exports = (stats, application) => {
    Object.keys(stats).forEach(async (pid, index) => {
        secondsFunction(stats[pid], application[index]).then((seconds) => {
            minutesFunction(application[index], seconds).then((minutes) => {
                hoursFunction(application[index], minutes).then((hours) => {
                   // console.log(hours);
                }).catch(e => { return e })
            }).catch(e => { return e })
        }).catch(e => { return e })
    });
}