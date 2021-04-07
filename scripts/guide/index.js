const fs = require('fs-extra');
const { brands, paths, pkg } = require('../../constants');
const handlebars = require('./config');
const capitalize = require('./helpers/capitalize');

const props = {
    colors: 'color',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    letterSpacing: 'letter-spacing',
    lineHeight: 'line-height',
};

brands.forEach((brand) => {
    const destPath = `${paths.dist.root}${brand}/index.html`;

    console.info(
        `\n[guide] Building ${brand.replace('-', ' ').toUpperCase()}\n`
    );

    const data = Object.entries(props).reduce((accum, [name, file]) => {
        const values = Object.values(
            fs.readJsonSync(
                `${paths.dist.root}${brand}/properties/${file}.json`
            )
        );
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
            brand: capitalize(brand.split('-')),
        })
    );

    console.info(`✔︎ ${destPath}`);
});
