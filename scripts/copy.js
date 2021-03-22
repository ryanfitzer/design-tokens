const fs = require('fs-extra');
const { paths } = require('../constants');
const pkg = require(`${paths.root}package.json`);

const files = ['README.md'];

const copyFiles = () =>
    files.forEach((file) =>
        fs.copySync(`${paths.root}${file}`, `${paths.build.root}${file}`)
    );

const createPkgFile = () => {
    // Add package.json to build without `prepare` script.
    delete pkg.scripts.prepare;
    fs.writeJsonSync(`${paths.build.root}package.json`, pkg, { spaces: 2 });
};

copyFiles();
createPkgFile();
