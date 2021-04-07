const fs = require('fs-extra');
const handlebars = require('handlebars');
const markdown = require('helper-markdown');
const { paths } = require('../../constants');

const options = { encoding: 'utf8' };
const partialsPath = `${paths.scripts.guide}partials/`;
const helpersPath = `${paths.scripts.guide}helpers/`;

const partials = fs
    .readdirSync(partialsPath, options)
    .map((file) => [
        file.replace('.hbs', ''),
        fs.readFileSync(`${partialsPath}${file}`, options),
    ]);

const helpers = fs
    .readdirSync(helpersPath, options)
    .map((file) => [
        file.replace('.js', ''),
        require(`${helpersPath}${file}`, options),
    ]);

// Register partials
partials.forEach(([name, partial]) =>
    handlebars.registerPartial(name, partial)
);

// Register helpers
helpers.forEach(([name, helper]) => handlebars.registerHelper(name, helper));
handlebars.registerHelper('markdown', markdown());

module.exports = handlebars;
