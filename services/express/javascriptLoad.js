let dir = __dirname,
    fs = require('fs'),
    javascriptFiles = fs.readdirSync(`${dir}/js`),
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

module.exports = awaitArray();