const fs = require('fs-extra');
const ghpages = require('gh-pages');
const { paths, pkg } = require('../../constants');

ghpages.publish(
    paths.dist.root,
    {
        add: true,
        async beforeAdd() {
            return fs.copySync(paths.dist.version, paths.dist.root);
        },
    },
    (err) => {
        if (err) return console.log(err);

        console.log(`Version ${pkg.version} published to gh-pages`);
    }
);
