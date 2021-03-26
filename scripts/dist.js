const fs = require('fs-extra');
const { paths } = require('../constants');

// Create versioned assets for package
fs.copySync(paths.build.root, paths.dist.root);
fs.copySync(paths.build.root, paths.dist.version);

// Remove unneeded files
['package.json', 'README.md'].forEach((file) => {
    fs.removeSync(`${paths.dist.root}${file}`);
    fs.removeSync(`${paths.dist.version}${file}`);
});
