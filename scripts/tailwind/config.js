const fs = require('fs-extra');
const { brands, paths } = require('../../constants');
const parseProperties = require('./helpers/parse-properties');

module.exports = module.exports = brands.map((brand) => {
    const jsonPath = `${paths.build.root}${brand}/properties/`;

    const colors = fs.readJsonSync(`${jsonPath}color.json`);
    const fonts = fs.readJsonSync(`${jsonPath}font.json`);
    const sizes = fs.readJsonSync(`${jsonPath}size.json`);

    return [
        brand,
        {
            // https://tailwindcss.com/docs/theme
            theme: {
                colors: {
                    ...parseProperties(colors),
                },
                fontFamily: {
                    ...parseProperties(fonts, { type: 'family' }),
                },
                fontSize: {
                    ...parseProperties(sizes, { type: 'font' }),
                },
                letterSpacing: {
                    ...parseProperties(sizes, { type: 'letter-spacing' }),
                },
                lineHeight: {
                    ...parseProperties(sizes, { type: 'line-height' }),
                },
            },

            // https://tailwindcss.com/docs/configuration#core-plugins
            corePlugins: [
                'backgroundColor',
                'borderColor',
                'fontFamily',
                'fontSize',
                'letterSpacing',
                'lineHeight',
                'textColor',
            ],

            // https://tailwindcss.com/docs/configuring-variants
            variants: [],

            // https://tailwindcss.com/docs/plugins
            plugins: [],
        },
    ];
});
