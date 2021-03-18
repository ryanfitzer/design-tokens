const { paths } = require('../../constants');
const checkAttr = require('./helpers/check-attr');

const brands = ['coach', 'kate-spade', 'stuart-weitzman'];

module.exports = brands.map((brand) => [
    brand,
    {
        include: [`${paths.src.properties}@defaults/**/*.json`],
        source: [`${paths.src.properties}${brand}/**/*.json`],
        platforms: {
            css: {
                transformGroup: 'custom-css-variables',
                buildPath: `${paths.build.root}${brand}/`,
                options: {
                    // outputReferences: true,
                },
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
                transforms: ['attribute/cti'],
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
        },
    },
]);
