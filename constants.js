const path = require('path');
const pkg = require('./package.json');

const root = path.resolve(__dirname);

const resolve = (part) => path.normalize(`${path.resolve(root, part)}/`);

module.exports = {
    namespace: {
        prefix: 'dt',
        global: 'DT',
    },
    pkgName: pkg.name,
    paths: {
        root,
        scripts: {
            root: resolve('scripts'),
        },
        src: {
            root: resolve('src'),
            tokens: resolve('src/tokens'),
        },
        build: {
            root: resolve('build'),
            assets: resolve('build/assets'),
            styles: resolve('build/assets/styles'),
            properties: resolve('build/properties'),
            scripts: resolve('build/scripts'),
        },
    },
};
