const fs = require('fs-extra');
const ghpages = require('gh-pages');
const { paths, pkg } = require('../constants');

// Create versioned assets for package
fs.copySync(paths.build.root, paths.dist.root);
fs.copySync(paths.build.root, paths.dist.version);

// Remove unneeded files
['package.json', 'README.md'].forEach((file) => {
    fs.removeSync(`${paths.dist.root}${file}`);
    fs.removeSync(`${paths.dist.version}${file}`);
});

// Publish to gh-pages branch
ghpages.publish(
    paths.dist.root,
    {
        add: true,
    },
    (err) => {
        if (err) return console.log(err);

        console.log(`Version ${pkg.version} published to gh-pages`);
    }
);
