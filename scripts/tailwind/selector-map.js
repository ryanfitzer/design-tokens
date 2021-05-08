var rSize = '(xs|s|m|l|xl|\\dxl)';
var rLevel = '(primary|secondary)';

module.exports = {
    bg: [
        {
            type: 'background-color',
            matcher: /^bg-/,
        },
    ],
    border: [
        {
            type: 'border-color',
            matcher: /^border-/,
        },
    ],
    font: [
        {
            type: 'font-family',
            matcher: /^font-/,
        },
    ],
    'line-height': [
        {
            type: 'line-height',
            matcher: /^line-height-/,
        },
    ],
    'letter-spacing': [
        {
            type: 'letter-spacing',
            matcher: /^letter-spacing-/,
        },
    ],
    text: [
        {
            type: 'font-size',
            matcher: /^text-\d{1,2}$/,
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-display-${rSize}`),
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-body-${rSize}`),
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-(eyebrow|cta|badge)-${rSize}`),
        },
        {
            type: 'text-color',
            matcher: /^text-/,
        },
    ],
};
