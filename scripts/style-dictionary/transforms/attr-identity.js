/**
 * Get the style type based on category/type.
 * @param {object} prop - A property object.
 * @returns {string}
 */
const getStyleType = ({ category, type }) => {
    if (category === 'color') return 'color';
    if (category === 'component') return 'component';
    if (category === 'font') return 'font';

    if (category === 'size') {
        if (type === 'font') return 'text';
        else return type;
    }

    return category;
};

/**
 * Normalize the name to use remove any unneeded parts.
 * @param {object} attributes - The `attributes` object from a property object.
 * @param {array} path - The property object's `path` array.
 * @returns {string}
 */
const normalizeName = (attributes, path) => {
    const isSingleName = path.length < 3;
    const isSizeName = attributes.category === 'size';
    const isFamilyName = attributes.type === 'family';
    const isFaceName = attributes.type === 'face';

    if (isSingleName || isSizeName) {
        return path[path.length - 1];
    }

    if (isFamilyName || isFaceName) {
        return path.slice(2).join('-');
    }

    return path.slice(-2).join('-');
};

/**
 * Creates an object that contains the identity name for each format.
 * @param {object} prop - A property object.
 * @returns {object}
 */
module.exports = ({ attributes, path }) => {
    const prefix = getStyleType(attributes);
    const name = normalizeName(attributes, path);
    const isFontFace = attributes.type === 'face';
    const isFontTrack = attributes.type === 'track';
    const noIdent = isFontFace || isFontTrack;

    if (noIdent) {
        return {
            identity: {
                prefix,
                name,
            },
        };
    }

    return {
        identity: {
            prefix,
            name,
            css: {
                customProperty: `--${prefix}-${name}`,
                scssVariable: `$${prefix}-${name}`,
            },
        },
    };
};
