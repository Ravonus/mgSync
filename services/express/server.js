const express = require('express'),
    expressVue = require("express-vue"),
    { promisify } = require('util'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./routes/routes'),
    app = express(),
    ip = require('ip'),
    dir = __dirname;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', routes);
app.use(express.static(dir + '/shared'));
app.use(express.static(dir + '/public'));

fs.readFile = promisify(fs.readFile);

var checkVue = fs.readdirSync(dir + '/vue');
var vueFiles = [];
// var tests = fs.readFileSync(`${dir}/vue/2-vueApp.js`, 'utf8');

// tests = tests.replace(/data: {([^}]+)}|data:{([^}]+)}/,'data:{test:true}')
// console.log(tests);
Functions.asyncForEach(checkVue, async (vueFile, index) => {

    if (vueFile.substr(-3) === '.js') {

        vueFiles.push(vueFile);
    }

    if (index === checkVue.length - 1) {
        if (vueFiles.length !== 0) {
            if (vueFiles.length > 1) {

            } else {
                let files = fs.readdirSync(`${dir}/vue/data`, 'utf8');
                let push = "";
                let first = false;
                await Functions.asyncForEach(files, async (file, index) => {

                    let contents = await fs.readFile(`${dir}/vue/data/${file}`, 'utf8');
                    let objects = contents.match(/{([^]+)/);
  
                            // obj = obj.replace(/(\r\n|\n|\r)/gm,"");
                            if(index !== files.length - 1) {
                                push += objects[0].substr(1).slice(0,-1)+',';
                            } else {
                                push += objects[0].substr(1).slice(0,-1);
                            }     
 
                });
                
                var contents = fs.readFileSync(`${dir}/vue/${vueFiles[0]}`, 'utf8');
                contents = contents.replace(/data: {([^}]+)}|data:{([^}]+)}/, `data: { ${push} }`);
                await fs.writeFileSync(`${dir}/js/${vueFiles[0]}`, contents);
            }
        }
        awaitArray();
    }

});

//load javascript files

let javascriptFiles = fs.readdirSync(`${dir}/js`),
    compressor = require('node-minify'),
    contents = fs.readFileSync(`${dir}/views/partials/scripts.ejs`, 'utf8'),
    topContent = contents.replace(/\<!-- Don't Edit below this line -->(.|[\r\n])+/, ''),
    writecontent = '';

async function awaitArray() {
    await Functions.asyncForEach(javascriptFiles, async (file) => {
        let filePath = `${dir}/js/${file}`,
            contents = await fs.readFile(filePath, 'utf8'),
            newFile = file.replace(/\d+-/, ''),
            newFilePath = `${dir}/public/js/${newFile}`;

        if (config.mgSync.minify) {
            var promise = compressor.minify({
                compressor: config.mgSync.minify,
                input: filePath,
                output: newFilePath
            });

            promise.then(function (min) { });

        } else {

            fs.writeFile(newFilePath, contents);

        }


        writecontent += `<script src="js/${newFile}"></script>\n`

    });

    fs.writeFile(`${dir}/views/partials/scripts.ejs`, `${topContent}<!-- Don't Edit below this line -->\n${writecontent}`);

}

awaitArray();

app.listen(config.mgSync.port, () => {
    log('express-started', [ip.address(), config.mgSync.port]);
});
module.exports = app;