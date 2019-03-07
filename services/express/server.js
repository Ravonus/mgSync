const express = require('express'),
    bodyParser = require('body-parser'),
    { promisify } = require('util'),
    fs = require('fs'),
    path = require('path'),
    routes = require('./routes/routes'),
    app = express(),
    cookieParser = require('cookie-parser'),
    ip = require('ip'),
    dir = __dirname;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.recaptcha = require('./middleware/googleRecaptcha');
app.permissions = require('./middleware/permissions');
app.groups = require('./middleware/groups')

app.use(bodyParser.json());
app.use(cookieParser());
require('./middleware/passport');
const auth = require('./apiRoutes/auth');
app.use('/auth', auth);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', routes);
app.use(express.static(dir + '/shared'));
app.use(express.static(dir + '/public'));

//load user vue script (This will add recaptcha to vue if its in config)



fs.readFile = promisify(fs.readFile);

var checkVue = fs.readdirSync(dir + '/vue');
var vueFiles = [];
let push = {};
let firstRun = {}
let myContents = {}




async function recaptchSiteKey(contents) {
    return contents.replace('recaptchSiteKey: recaptchSiteKey', `recaptchSiteKey: "${config.express.recaptchSiteKey}"`);

}

Functions.asyncForEach(checkVue, async (vueFile, index) => {

    if (vueFile.substr(-3) === '.js') {

        vueFiles.push(vueFile);
    }

    if (index === checkVue.length - 1) {
        if (vueFiles.length !== 0) {

            vueFiles.forEach(async (file, index) => {

                async function vueUpdate(files, directory, type) {

                    await Functions.asyncForEach(files, async (fileSecond, index) => {

                        let contents = await fs.readFile(`${dir}/vue/${type}/${directory}/${fileSecond}`, 'utf8');

                        let objects = contents.match(/{([^]+)/);
                        if (config.express.recaptchSiteKey && file == 'userApp.js' && fileSecond === 'data.js') {

                            objects[0] = await recaptchSiteKey(objects[0]);
                        }

                        if (index !== files.length - 1) {
                            push[directory][type] += objects[0].substr(1).slice(0, -1) + ',';
                        } else {
                            push[directory][type] += objects[0].substr(1).slice(0, -1);
                        }

                    });

                    var regex = new RegExp(`${type}: {([^}][^,]+)|${type}:{([^}][^,]+)`, '');
                    if (firstRun[directory]) {
                        firstRun[directory] = false;
                        myContents[directory] = fs.readFileSync(`${dir}/vue/${file}`, 'utf8');
                    }

                    myContents[directory] = await myContents[directory].replace(regex, `${type}: { ${push[directory][type]} }`);
                    await fs.writeFileSync(`${dir}/js/${file}`, myContents[directory]);

                }

                var directory = file.substring(0, file.length - 3);
                if (!firstRun[directory]) firstRun[directory] = true;
                let first = false;


                var files = fs.readdirSync(`${dir}/vue/data/${directory}`, 'utf8');

                push[directory] = {
                    data: '',
                    methods: '',
                }
                if (files.length > 0) vueUpdate(files, directory, 'data');


                var files = fs.readdirSync(`${dir}/vue/methods/${directory}`, 'utf8');

                push[directory] = {
                    data: '',
                    methods: '',
                }
                if (files.length > 0) vueUpdate(files, directory, 'methods');

            });

        }
        //   awaitArray();
        require('./cssLoad');
        require('./javascriptLoad');
    }

});

app.listen(config.express.port, () => {
    log('express-started', [ip.address(), config.express.port]);
});
module.exports = app;