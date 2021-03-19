const checkAttr = require('./filters/check-attr');
const fontFace = require('./formats/css-font-face');
const jsonProperties = require('./formats/json-properties');
const sizeUnitless = require('./transforms/size-unitless');
const nameKabab = require('./transforms/name-kabab');
const capitalize = require('./transforms/capitalize');
const attrIdentity = require('./transforms/attr-identity');

module.exports = {
    Action: [],
    Filter: [],
    Format: [
        {
            name: 'css/font-face',
            formatter: fontFace,
        },
        {
            name: 'json/properties',
            formatter: jsonProperties,
        },
    ],
    Template: [],
    Transform: [
        {
            name: 'attribute/identity',
            type: 'attribute',
            transformer: attrIdentity,
        },
        {
            name: 'name/identity/capitalize',
            type: 'name',
            transformer: ({ name }) => capitalize(name.split('-'), ' '),
        },
        {
            name: 'name/identity/kabab',
            type: 'name',
            transformer: nameKabab,
        },
        {
            name: 'size/line-height/unitless',
            type: 'value',
            matcher: checkAttr('type', 'line-height'),
            transformer: sizeUnitless,
        },
    ],
    TransformGroup: [
        {
            name: 'css-custom',
            transforms: [
                'attribute/cti',
                'attribute/identity',
                'name/identity/kabab',
                'size/pxToRem',
                'size/line-height/unitless',
                'color/css',
            ],
        },
        {
            name: 'json-custom',
            transforms: [
                'attribute/cti',
                'attribute/identity',
                'name/identity/kabab',
                'size/pxToRem',
                'size/line-height/unitless',
                'color/css',
            ],
        },
    ],
};
