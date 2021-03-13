const isLineHeight = require('./filters/type-line-height');
const sizeUnitless = require('./transforms/size-unitless');

module.exports = {
    Action: [],
    Filter: [
        {
            name: 'isLineHeight',
            matcher: isLineHeight,
        },
    ],
    Format: [],
    Template: [],
    Transform: [
        {
            name: 'size/line-height/unitless',
            type: 'value',
            matcher: isLineHeight,
            transformer: sizeUnitless,
        },
    ],
};
