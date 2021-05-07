const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const globby = require('globby');
const { optimize, extendDefaultPlugins } = require('svgo');

const svgOptimize = (src, relPath, absPath) => {
    const className = `icon-${relPath.replace(/\//g, '-').replace('.svg', '')}`;

    const result = optimize(src, {
        path: absPath,
        plugins: extendDefaultPlugins([
            {
                name: 'prefixIds',
            },
            {
                name: 'addClassesToSVGElement',
                params: {
                    className,
                },
            },
        ]),
    });

    return result.data;
};

const copy = (dictionary, config) => {
    config.source.forEach((dirPath) => {
        const svgPaths = globby.sync(`${dirPath}*/**`);

        svgPaths.forEach((svgPath) => {
            const relPath = path.relative(dirPath, svgPath);
            const destPath = path.resolve(config.buildPath, relPath);
            const svgSrc = fs.readFileSync(svgPath, { encoding: 'utf8' });
            const optSrc = svgOptimize(svgSrc, relPath, svgPath);

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
