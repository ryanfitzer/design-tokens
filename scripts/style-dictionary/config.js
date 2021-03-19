const { brands, paths } = require('../../constants');
const checkAttr = require('./filters/check-attr');

module.exports = brands.map((brand) => [
    brand,
    {
        include: [`${paths.src.root}@defaults/**/*.json`],
        source: [`${paths.src.root}${brand}/**/*.json`],
        platforms: {
            css: {
                transformGroup: 'css-custom',
                buildPath: `${paths.build.root}${brand}/`,
                files: [
                    {
                        format: `css/variables`,
                        destination: `variables.css`,
                        filter: checkAttr([['type', 'face', false]]),
                    },
                    {
                        format: `scss/variables`,
                        destination: `_variables.scss`,
                        filter: checkAttr([['type', 'face', false]]),
                    },
                ],
            },
            'css/asset/font-face': {
                buildPath: `${paths.build.root}${brand}/`,
                transforms: ['attribute/cti', 'name/cti/kebab'],
                files: [
                    {
                        destination: 'font-face.css',
                        format: 'css/font-face',
                        filter: {
                            attributes: {
                                category: 'font',
                                type: 'face',
                            },
                        },
                    },
                ],
            },
            json: {
                buildPath: `${paths.build.root}${brand}/properties/`,
                transformGroup: 'json-custom',
                files: [
                    {
                        destination: 'index.json',
                        format: 'json/properties',
                    },
                    {
                        destination: 'color.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'color',
                            },
                        },
                    },
                    {
                        destination: 'font.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'font',
                                type: 'family',
                            },
                        },
                    },
                    {
                        destination: 'size.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'size',
                            },
                        },
                    },
                ],
            },
        },
    },
]);
