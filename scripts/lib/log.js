const chalk = require('chalk');

module.exports = (tag) => {
    const prefix = chalk.bold(`\n[${tag.toUpperCase()}] `);
    const check = chalk.bold.green('✔︎  ');
    const minus = chalk.bold.red('- ');

    const log = (msg) => console.info(`${msg}`);
    log.warn = (msg) => console.warn(`WARN: ${msg}`);
    log.error = (msg) => console.error(`ERROR: ${msg}`);
    log.tag = (msg) => console.info(`${prefix}${msg}`);
    log.add = (msg) => console.info(`${check}${msg}`);
    log.remove = (msg) => console.info(`${minus}${msg}`);

    return log;
};
