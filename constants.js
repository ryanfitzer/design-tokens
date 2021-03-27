const path = require('path');
const pkg = require('./package.json');

const root = path.resolve(__dirname);

const resolve = (part) => path.normalize(`${path.resolve(root, part)}/`);

console.log('process.env.PKG_VERSION', process.env.PKG_VERSION);

module.exports = {
    brands: ['coach', 'kate-spade', 'stuart-weitzman'],
    namespace: {
        prefix: 'dt',
        global: 'DT',
    },
    pkg: {
        name: pkg.name,
        version: process.env.PKG_VERSION || pkg.version,
    },
    paths: {
        root: resolve(root),
        build: {
            root: resolve('build'),
            version: resolve(`build/${pkg.version}`),
        },
        dist: {
            root: resolve('dist'),
            version: resolve(`dist/${pkg.version}`),
        },
        scripts: {
            root: resolve('scripts'),
            styleDictionary: resolve('scripts/style-dictionary'),
            filters: resolve('scripts/style-dictionary/filters'),
            transforms: resolve('scripts/style-dictionary/transforms'),
        },
        src: {
            root: resolve('src'),
        },
    },
};
