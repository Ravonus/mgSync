const inquirer = require('inquirer'),
chalk = require('chalk');





inquirer
  .prompt([
    {name:'fucl', message:chalk.bold.redBright('FUCK YOU!')},
    {name:'fucl2', message:'FUCK YOU!2'}
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers)
  });