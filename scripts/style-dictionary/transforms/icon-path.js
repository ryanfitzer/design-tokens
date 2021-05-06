/**
 * Set icon path relative to build root.
 * @param {object} prop - The property object.
 * @param {object} platform - The platform config object.
 * @returns {string}
 */
module.exports = ({ attributes, value }, { brand }) => {
    if (attributes.type !== 'icon') return value;

    const { type, item } = attributes;

    return `${brand}/${type}/${item}/${value}`;
};
