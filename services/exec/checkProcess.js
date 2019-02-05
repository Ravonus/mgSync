const find = require('find-process');
let pidusage = require('pidusage');
let pids = [];
let intervalId;
let runOnce = false;
let isWin = process.platform === "win32";
function checkProcess(connect) {
    let application;

    if(!isWin){
     application = `${config.dsp['DS-conf']}${connect}`; 
    } else {
        application = connect; 
    }
    find('name', connect, true)
        .then(function (process) {
            if (process.length === 0) {
                var spawn = require('child_process').execFile;
                var runningProcess = spawn(application, { cwd: config.dsp['DS-conf'] }, function (err, stdout, stderr) {
                    if(err) err = err.toString();
                    if (err.includes('[SQL]')) {
                        let string = err.replace(/\[(.*?)\]/g, '').replace(/(?:\r\n|\r|\n)/gm, '').trim();
                        if (string !== '')
                            log({ msg: string, type: 'error', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });
                    }
                   
                    var index = pids.indexOf(runningProcess.pid);
                    if (index > -1) {
                        pids.splice(index, 1);
                    }
                    log('dspProcessClose', [connect], { process: connect, pid: runningProcess.pid });
                    clearInterval(intervalId);
                    checkProcess(connect);

                });
                runningProcess.stdout.on('data', (terminal) => {
                    let terminalContent = terminal.toString();
                    if (terminalContent.includes('[Debug]')) {
                        let string = terminalContent.replace(/\[(.*?)\]/g, '').replace(/(?:\r\n|\r|\n)/gm, '').trim();
                        if (string !== '')
                            log({ msg: string, type: 'warning', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });
                    }
                    if (terminalContent.includes('[Warning]')) {
                        let string = terminalContent.replace(/\[(.*?)\]/g, '').replace(/(?:\r\n|\r|\n)/gm, '').trim();
                        if (string !== '')
                            log({ msg: string, type: 'warning', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });
                    }
                    if (terminalContent.includes('[Status]')) {
                        
                        let string = terminalContent.replace(/\[(.*?)\]/g, '').replace(/(\r\n|\n|\r)/gm, '').trim();
                        if (string !== '')
                            log({ msg: string, type: 'success', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });

                    }
                    if (terminalContent.includes('[Lua]')) {
                        let string = terminalContent.replace(/\[(.*?)\]/g, '').replace(/(?:\r\n|\r|\n)/gm, '').trim();
                        if (string !== '')
                            log({ msg: string, type: 'info', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });
                    }
                    if (terminalContent.includes('[Info]')) {
                            let string = terminalContent.replace(/\[(.*?)\]/g, '').replace(/(?:\r\n|\r|\n)/gm, '').trim();
                            if (string !== '')
                        log({ msg: string, type: 'info', log: 3, path: './logs/dps/' }, { process: connect, pid: runningProcess.pid });
                    }

                });
                runningProcess.stderr.on('data', (terminal) => {
                    let terminalContent = terminal.toString();
                })
                pids.push(runningProcess.pid);
                log('dspProcess', [connect], { process: connect, pid: runningProcess.pid });
                if (config.dsp.processPollingTime && pids.length === config.dsp.executables.length) {
                    intervalId = setInterval(function () {
                        pidusage(pids, function (err, stats) {
                            //        console.log(stats)
                            if (err) {
                                clearInterval(intervalId);
                                return;
                            }
                        });
                    }, config.dsp.processPollingTime);
                }
            };
        });
}

module.exports = checkProcess;