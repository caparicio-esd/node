const path = require('path');
const fs = require('fs');
const chalk = require('chalk');  // https://www.npmjs.com/package/chalk

/**
 * librería de node de procesado de comandos de consola
 */
const yargs = require('yargs/yargs'); // https://www.npmjs.com/package/yargs
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv

// console.log(argv._[0]);
const action = argv._[0];

/**
 * Get saved messages from fs
 */
const pathData = path.resolve(__dirname, "") + "/messages.txt"; // https://nodejs.dev/learn/the-nodejs-path-module
const data = fs.readFileSync(pathData, "utf8"); // https://nodejs.dev/learn/reading-files-with-nodejs
const dataJson = JSON.parse(data); // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/JSON/parse


/**
 * methods
 */
const appendMessage = () => {
    // get data
    const message = argv.message;
    const title = argv.title;
    const date = new Date();
    const index = dataJson.length;

    dataJson.push({
        index,
        title,
        message,
        date
    });

    // save data
    fs.writeFileSync(pathData, JSON.stringify(dataJson, null, 4));  // https://nodejs.dev/learn/the-nodejs-fs-module
    console.log(chalk.green.bold(`Message id ${index} saved`));
};

const errorMessage = () => {
    console.log(chalk.red.bold("This action doesn't exist"));
};


const init = () => {
    /**
     * decide what to do
     */
    switch (action) {
        case "append":
            appendMessage();
            break;
        default:
            errorMessage();
    }
}

init();


