const fs = require('fs-extra');
const { brands, paths } = require('../../constants');
const parseProperties = require('./helpers/parse-properties');

module.exports = module.exports = brands.map((brand) => {
    const jsonPath = `${paths.build.root}${brand}/properties/`;

    const props = fs.readJsonSync(`${jsonPath}index.json`);

    return [
        brand,
        {
            // https://tailwindcss.com/docs/theme
            theme: {
                colors: {
                    ...parseProperties(props, { category: 'color' }),
                },
                fontFamily: {
                    ...parseProperties(props, { type: 'family' }),
                },
                fontSize: {
                    ...parseProperties(props, { type: 'font' }),
                },
                letterSpacing: {
                    ...parseProperties(props, { type: 'letter-spacing' }),
                },
                lineHeight: {
                    ...parseProperties(props, { type: 'line-height' }),
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
