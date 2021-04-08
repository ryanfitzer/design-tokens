/**
 * Checks attribute(s) against condition.
 * Can check 1 attribute, or an array of attributes.
 * @param {string|array} attr - The attribute key to check.
 * @param {string} expected - The expected attribute value.
 * @param {boolean} cond - Whether the expected value should match, or not.
 * @returns {boolean}
 * @example
 *      // category === 'color'
 *      checkAttr('category', 'color');
 *
 *      // category !== 'color'
 *      checkAttr('category', 'color', false);
 *
 *      // category === 'color' && type !== 'primary'
 *      checkAttr([
 *          [ 'category', 'color' ],
 *          [ 'type', 'primary', false ]
 *      ]);
 */
module.exports = (attr, expected, cond = true) => {
    return (prop) => {
        if (Array.isArray(attr)) {
            return attr.every(
                ([attr, expected, cond = true]) =>
                    (prop.attributes[attr] === expected) === cond
            );
        }

        return (prop.attributes[attr] === expected) === cond;
    };
};
