const find = require('find-process');
var pidusage = require('pidusage');

function checkProcess(connect) {

    find('name', connect, true)
        .then(function (process) {
            if (process.length === 0) {
                var exec = require('child_process').execFile;
                exec(connect, { cwd: config.dsp['DS-conf'] }, function () { })
            };
            find('name', connect, true)
                .then(function (process) {
                    if (process[0].pid) {
                        let intervalId = setInterval(function () {
                            pidusage(process[0].pid, function (err, stats) {
                                //    console.log(stats)
                                if (err) {
                                    clearInterval(intervalId);
                                    checkProcess(connect);
                                    return;
                                }

                            })
                        }, config.dsp.restartTime);
                    }
                });
        });
}

module.exports = checkProcess;