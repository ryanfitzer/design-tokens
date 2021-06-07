/**
 * Creates an `@mixin` scss file.
 * See {@link https://sass-lang.com/documentation/at-rules/mixin}
 * @param {object} object - The Style Dictionary properties object.
 * @returns {string}
 */
module.exports = ({ dictionary }) => {
    const utils = {};
    Object.values(dictionary.allProperties).forEach(
        ({ value, attributes, path }) => {
            const { item, subitem, state } = attributes;
            const key = `@mixin text-${item}-${subitem}-${state}`;
            const prop = path.pop();

            if (!utils[key]) utils[key] = [];

            utils[key].push(`${prop}: ${value};`);

            utils[key][prop] = value;
        }
    );

    return Object.keys(utils)
        .map((key) => `${key} {\n\t${utils[key].join('\n\t')}\n}`)
        .join('\n');
};
