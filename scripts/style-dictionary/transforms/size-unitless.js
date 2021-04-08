/**
 * Strips the unit from the string
 * @param {object} prop - A property object.
 * @returns {number}
 */
module.exports = (prop) => {
    return parseFloat(prop.original.value, 10);
};
