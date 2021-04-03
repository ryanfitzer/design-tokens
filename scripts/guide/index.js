const fs = require('fs-extra');
const { brands, paths } = require('../../constants');
const handlebars = require('./config');
const capitalize = require('./helpers/capitalize');

brands.forEach((brand) => {
    const jsonPath = `${paths.build.root}${brand}/properties/`;
    const colors = Object.values(fs.readJsonSync(`${jsonPath}color.json`));
    const fonts = Object.values(fs.readJsonSync(`${jsonPath}font.json`));
    const sizes = Object.values(fs.readJsonSync(`${jsonPath}size.json`));

    const page = fs.readFileSync(`${paths.scripts.guide}page.hbs`, {
        encoding: 'utf8',
    });

    const renderPage = handlebars.compile(page);

    fs.writeFileSync(
        `${paths.build.root}${brand}/index.html`,
        renderPage({
            brand: capitalize(brand.split('-')),
            colors,
            fonts,
            sizes,
        })
    );
});
