const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const globby = require('globby');
const { optimize } = require('svgo');

const svgOptimize = (src, svgPath) => {
    const result = optimize(src, {
        path: svgPath,
    });

    return result.data;
};

const copy = (dictionary, config) => {
    config.source.forEach((dirPath) => {
        const svgPaths = globby.sync(`${dirPath}*/**`);

        svgPaths.forEach((svgPath) => {
            const relPath = path.relative(dirPath, svgPath);
            const destPath = path.resolve(config.buildPath, relPath);
            const svgSrc = fs.readFileSync(svgPath);
            const optSrc = svgOptimize(svgSrc, svgPath);

            fs.outputFile(destPath, optSrc, (err) => {
                if (err) console.error(err);
            });
        });

        console.info(
            [
                chalk.bold.green('✔︎  '),
                `from: ${dirPath}`,
                `\n${chalk.hidden('   ')}`,
                `to:${chalk.hidden('   ')}${config.buildPath}`,
            ].join('')
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
