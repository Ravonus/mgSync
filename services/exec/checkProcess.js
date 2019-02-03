const find = require('find-process');
var pidusage = require('pidusage');
var running = false;
var pids = [];
var intervalId;
function checkProcess(connect) {

    find('name', connect, true)
        .then(function (process) {
            if (process.length === 0) {
                var spawn = require('child_process').execFile;
                console.log('STARTED');
                var runningProcess = spawn(connect, { cwd: config.dsp['DS-conf'] }, function (err, stdout, stderr) {
                    var index = pids.indexOf(runningProcess.pid);
                    if (index > -1) {
                    pids.splice(index, 1);
                    }
                    clearInterval(intervalId);
                    checkProcess(connect); 
                   
                })

                runningProcess.stdout.on('data', function (data) {
                  //  console.log('stdout: ' + data.toString());
                });
                pids.push(runningProcess.pid)
                console.log(pids.length, config.dsp.executables.length)
                
                if(config.dsp.processPollingTime && pids.length === config.dsp.executables.length) {
                    intervalId = setInterval(function () {
                        console.log(pids)
                        pidusage(pids, function (err, stats) {
              
                                 console.log(stats)
                            if (err) {
                                clearInterval(intervalId);
                                return;
                            }
                
                        })
                    }, config.dsp.processPollingTime);
                }

            };
   
        });
}

module.exports = checkProcess;