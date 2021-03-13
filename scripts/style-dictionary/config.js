const { paths } = require('../../constants');

const brands = ['coach', 'kate-spade', 'stuart-weitzman'];

module.exports = brands.map((brand) => [
    brand,
    {
        include: [`${paths.src.properties}global/**/*.json`],
        source: [`${paths.src.properties}${brand}/**/*.json`],
        platforms: {
            css: {
                transforms: [
                    'attribute/cti',
                    'name/cti/kebab',
                    'color/css',
                    'size/pxToRem',
                    'size/line-height/unitless',
                ],
                buildPath: `${paths.build.root}${brand}/`,
                options: {
                    outputReferences: true,
                },
                files: [
                    {
                        format: `css/variables`,
                        destination: `variables.css`,
                    },
                ],
            },
        },
    },
]);
