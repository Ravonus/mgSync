const inquirer = require('inquirer'),
  chalk = require('chalk');

inquirer
  .prompt([
    { type: 'confirm', name: 'dspEnabled', message: chalk.bold.blueBright('Enable DSP management portion?') },
    { type: 'confirm', name: 'mysqlEnabled', message: chalk.bold.blueBright('Enable DSP Mysql access?') }
  ])
  .then(answers => {

    if (answers.dspEnabled) {
      inquirer
        .prompt([
          { type: 'input', name: 'conf', message: chalk.bold.greenBright('Configuration direction?') },
          { type: 'input', name: 'exec1', message: chalk.bold.greenBright('executable one') },
          { type: 'input', name: 'exec2', message: chalk.bold.greenBright('executable two') },
          { type: 'input', name: 'exec3', message: chalk.bold.greenBright('executable three') },
          { type: 'input', name: 'poll', message: chalk.bold.greenBright('Processing polling time. (How often do you want to check stats of executables?)') },
          { type: 'confirm', name: 'push', message: chalk.bold.greenBright('Allow Mog Garden pull?') },
          { type: 'confirm', name: 'push', message: chalk.bold.greenBright('Allow Mog Garden push?') }
        ]).then(answers => {
          mysqlCheck()
        });
    } else {
      mysqlCheck()
    }

    function mysqlCheck() {
      if (answers.mysqlEnabled) {
        inquirer
          .prompt([
            { type: 'input', name: 'mysql-host', message: chalk.bold.greenBright('mysql-host') },
            { type: 'input', name: 'mysql-db', message: chalk.bold.greenBright('mysql-db') },
            { type: 'input', name: 'mysql-user', message: chalk.bold.greenBright('mysql-user') },
            { type: 'input', name: 'mysql-password', message: chalk.bold.greenBright('mysql-password') }
          ]).then(answers => {
            inquirer
              .prompt([
                { type: 'confirm', name: 'mgSync', message: chalk.bold.blueBright('Enable Mog Garden Database Sync?') }
              ])
              .then(answers => {
                if (answers.mgSync) {
                  inquirer
                    .prompt([
                      { type: 'input', name: 'mgServer', message: chalk.bold.greenBright('What is the push server?'), default: 'https://mog.garden' },
                      { type: 'confirm', name: 'mgSecure', message: chalk.bold.greenBright('Is the push server secured?'), default: true },
                      { type: 'input', name: 'mgToken', message: chalk.bold.greenBright('What is your Token ID?') },
                      { type: 'input', name: 'mgTimeout', message: chalk.bold.greenBright('Timeout for when you want app to stop trying to attempt to push server?'), default: 15000 },
                    ])
                    .then(answers => {

                    });
                }
              });
          });
      }
    }
  });