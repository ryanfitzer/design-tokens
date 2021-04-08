/**
 * Runs build for each brand.
 */
const fs = require('fs-extra');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const configs = require('./config');
const { paths } = require('../../constants');

// Build each brand
configs.forEach(async ([brand, config]) => {
    const tailwindFilePath = `${paths.src.root}${brand}/tailwind.css`;
    const destPath = `${paths.build.root}${brand}/utilities.css`;

    const css = fs.readFileSync(tailwindFilePath, 'utf8');

    fs.ensureDirSync(`${paths.build.root}${brand}`);

    postcss([postcssImport, tailwindcss(config), autoprefixer])
        .process(css, {
            from: tailwindFilePath,
            to: destPath,
        })
        .then((result) => {
            console.info(
                `\n[tailwind] Building ${brand
                    .replace('-', ' ')
                    .toUpperCase()}\n`
            );
            fs.writeFileSync(destPath, result.css);
            console.info(`✔︎ ${destPath}`);
        });
});
