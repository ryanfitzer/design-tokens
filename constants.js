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
            styleDictionary: resolve('scripts/style-dictionary'),
            filters: resolve('scripts/style-dictionary/filters'),
            transforms: resolve('scripts/style-dictionary/transforms'),
        },
        src: {
            root: resolve('src'),
            properties: resolve('src/properties'),
        },
        build: {
            root: resolve('build'),
            assets: resolve('build/assets'),
            styles: resolve('build/assets/styles'),
            properties: resolve('build/properties'),
        },
    },
};
