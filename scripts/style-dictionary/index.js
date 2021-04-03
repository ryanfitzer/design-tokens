const StyleDictionary = require('style-dictionary');
const configs = require('./config');
const registrations = require('./register');

// Register helpers
Object.entries(registrations).forEach(([type, configs]) =>
    configs.forEach((config) => StyleDictionary[`register${type}`](config))
);

// Build each brand
configs.forEach(([brand, config]) => {
    console.info(
        `\n[style-dictionary] Building ${brand.replace('-', ' ').toUpperCase()}`
    );

    const styleDictionary = StyleDictionary.extend(config);

    styleDictionary.cleanAllPlatforms();
    styleDictionary.buildAllPlatforms();
});
