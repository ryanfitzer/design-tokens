const isLineHeight = require('./filters/type-line-height');
const fontFace = require('./formats/css-font-face');
const sizeUnitless = require('./transforms/size-unitless');

module.exports = {
    Action: [],
    Filter: [
        {
            name: 'isLineHeight',
            matcher: isLineHeight,
        },
    ],
    Format: [
        {
            name: 'css/font-face',
            formatter: fontFace,
        },
    ],
    Template: [],
    Transform: [
        {
            name: 'size/line-height/unitless',
            type: 'value',
            matcher: isLineHeight,
            transformer: sizeUnitless,
        },
    ],
    TransformGroup: [
        {
            name: 'custom-css-variables',
            transforms: [
                'attribute/cti',
                'name/cti/kebab',
                'color/css',
                'size/pxToRem',
                'size/line-height/unitless',
            ],
        },
    ],
};
