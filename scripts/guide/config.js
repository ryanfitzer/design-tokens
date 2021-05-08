/**
 * Configures and exports `handlebars` instance.
 */
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const handlebars = require('handlebars');
const { paths } = require('../../constants');

const enc = { encoding: 'utf8' };
const partialsPath = `${paths.scripts.guide}partials/`;
const helpersPath = `${paths.scripts.guide}helpers/`;

const partials = globby.sync('**', { cwd: partialsPath }).map((file) => {
    const { name } = path.parse(file);
    return [name, fs.readFileSync(`${partialsPath}${file}`, enc)];
});

const helpers = fs
    .readdirSync(helpersPath, enc)
    .map((file) => [
        file.replace('.js', ''),
        require(`${helpersPath}${file}`, enc),
    ]);

// Register partials
partials.forEach(([name, partial]) =>
    handlebars.registerPartial(name, partial)
);

// Register helpers
helpers.forEach(([name, helper]) => handlebars.registerHelper(name, helper));

module.exports = handlebars;
