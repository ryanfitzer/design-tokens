const StyleDictionary = require( 'style-dictionary' );
const { paths } = require( '../constants' );


const brands = [
  'coach',
  'kate-spade'
];

brands.forEach(brand => {
  
  console.log(`\nBuilding ${brand}`);
  
  const styleDictionary = StyleDictionary.extend({
    include: [
      `${paths.src.tokens}global/**/*.json`,
      `${paths.src.tokens}brands/defaults/**/*.json`,
    ],
    source: [
      `${paths.src.tokens}brands/${brand}/**/*.json`
    ],
    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: `${paths.build.root}${brand}/`,
        files: [{
          destination: `variables.css`,
          format: `css/variables`
        }]
      }
    }
  });
  
  console.log(JSON.stringify(styleDictionary.properties, null, 2));

  styleDictionary.buildAllPlatforms();
});
