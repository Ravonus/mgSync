
var connect = '/mnt/c/Program\ Files\ \(x86\)/Darkstar/DSConnect-server';
var dir = '/mnt/c/Program\ Files\ \(x86\)/Darkstar/'


var spawn = require('child_process').execFile;


var runningProcess = spawn(connect, { cwd: dir }, function (err, stdout, stderr) {
                   
  console.log(err)




});

