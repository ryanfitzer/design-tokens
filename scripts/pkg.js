/**
 * Adds and configures needed files for creating an NPM package from the build.
 */
const fs = require('fs-extra');
const { paths } = require('../constants');
const pkg = require(`${paths.root}package.json`);

const filesToCopy = ['README.md'];

const copyFiles = () =>
    filesToCopy.forEach((file) =>
        fs.copySync(`${paths.root}${file}`, `${paths.build.root}${file}`)
    );

// Add package.json to build
const createPkgFile = () => {
    // Remove unneeded `prepare` script
    delete pkg.scripts.prepare;

    fs.writeJsonSync(`${paths.build.root}package.json`, pkg, { spaces: 2 });
};

copyFiles();
createPkgFile();
