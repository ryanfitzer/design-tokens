const fs = require('fs-extra');
const chalk = require('chalk');

const copy = (dictionary, config) => {
    config.source.forEach((sourcePath) => {
        fs.copySync(sourcePath, config.buildPath);
        console.info(
            `${chalk.bold.green('✔︎  ')}from: ${sourcePath}\n${chalk.hidden(
                '   '
            )}to:${chalk.hidden('   ')}${config.buildPath}`
        );
    });
};

const clear = (dictionary, config) => {
    fs.emptyDirSync(config.buildPath);
    console.info(`${chalk.bold.red('- ')}${config.buildPath}`);
};

module.exports = {
    copy,
    clear,
};
