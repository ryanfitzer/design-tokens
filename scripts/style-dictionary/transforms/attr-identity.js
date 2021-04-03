const getStyleType = ({ category, type }) => {
    if (category === 'color') return 'color';
    if (category === 'component') return 'component';
    if (category === 'font') return 'font';

    if (category === 'size') {
        if (type === 'font') return 'text';
        if (type === 'letter-spacing') return 'tracking';
        if (type === 'line-height') return 'leading';
    }
};

const normalizeName = (attributes, path) => {
    const isSingleName = path.length < 3;
    const isSizeName = attributes.category === 'size';
    const isFamilyName = attributes.type === 'family';

    if (isSingleName || isSizeName) {
        return path[path.length - 1];
    }

    if (isFamilyName) {
        return path.slice(2).join('-');
    }

    return path.slice(-2).join('-');
};

module.exports = ({ attributes, path }) => {
    const prefix = getStyleType(attributes);
    const name = normalizeName(attributes, path);

    return {
        identity: {
            prefix,
            name,
            css: {
                // class: `.${prefix}-${name}`,
                customProperty: `--${prefix}-${name}`,
                scssVariable: `$${prefix}-${name}`,
            },
        },
    };
};
