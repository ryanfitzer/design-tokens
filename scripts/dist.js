const fs = require('fs-extra');
const { paths } = require('../constants');

(async () => {
    // Make sure build directory exists
    if (!(await fs.pathExists(paths.build.root))) {
        return console.error(
            `\n[dist] ERROR: No build directory found at "${paths.build.root}"\n`
        );
    }

    // Create versioned assets for package
    fs.copySync(paths.build.root, paths.dist.root);
    fs.copySync(paths.build.root, paths.dist.version);

    // Remove unneeded files
    ['package.json', 'README.md'].forEach((file) => {
        fs.removeSync(`${paths.dist.root}${file}`);
        fs.removeSync(`${paths.dist.version}${file}`);
    });
})();
