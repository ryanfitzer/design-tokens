/**
 * Runs build for each brand.
 */
const fs = require('fs-extra');
const { brands, paths, pkg } = require('../../constants');
const handlebars = require('./config');
const capitalize = require('./helpers/capitalize');
const tokenConfigs = require(`${paths.scripts.styleDictionary}config`);

const listAssets = (index) => {
    const [brand, config] = tokenConfigs[index];

    return Object.entries(config.platforms).reduce(
        (accum, [type, { description, files }]) => {
            if (type === 'properties') return accum;

            files.forEach(({ destination }) =>
                accum.push({
                    desc: description,
                    name: destination,
                    url: `${paths.cdn}${brand}/${destination}`,
                })
            );

            return accum;
        },
        []
    );
};

brands.forEach(async (brand, index) => {
    const displayBrand = brand.replace('-', ' ').toUpperCase();
    const destPath = `${paths.build.root}${brand}/index.html`;
    const propsPath = `${paths.build.root}${brand}/properties/`;
    const propsExist = await fs.pathExists(propsPath);
    const propsFiles = fs.readdirSync(propsPath, { encoding: 'utf8' });

    console.info(`\n[guide] Building ${displayBrand}\n`);

    if (!propsExist) {
        return console.error(
            `\n[guide] ERROR: No properties directory found for ${displayBrand} at "${propsPath}"\n`
        );
    }

    const data = propsFiles.reduce((accum, file) => {
        if (file === 'index.json') return accum;

        const name = file.replace('.json', '');

        const values = Object.values(fs.readJsonSync(`${propsPath}${file}`));

        accum[name] = values;

        return accum;
    }, {});

    const page = fs.readFileSync(`${paths.scripts.guide}page.hbs`, {
        encoding: 'utf8',
    });

    const renderPage = handlebars.compile(page);

    fs.writeFileSync(
        destPath,
        renderPage({
            ...data,
            version: pkg.version,
            assets: listAssets(index),
            brand: capitalize(brand.split('-')),
        })
    );

    console.info(`✔︎ ${destPath}`);
});
