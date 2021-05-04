const fs = require('fs-extra');
const { paths } = require('../../constants');
const selectorMap = require('./selector-map');

const attrKeys = ['item', 'subitem', 'state', 'substate'];

const getType = (name) => {
    const prefixes = Object.values(selectorMap);

    return prefixes.reduce((acuum, types) => {
        const type = types.find(({ matcher }) => matcher.test(name));

        if (type) acuum = type.type;

        return acuum;
    }, 'undefined');
};
const createProperty = (selector, decls) => {
    const name = selector.replace(/^\./, '');
    const path = name.split('-');

    const attrs = path.reduce((acuum, value, index) => {
        acuum[attrKeys[index]] = value;
        return acuum;
    }, {});

    return {
        [name]: {
            name,
            value: decls.join(';\n'),
            attributes: {
                category: 'utility',
                type: getType(name),
                ...attrs,
                identity: {
                    prefix: path[0],
                    name: path.slice(1).join('-'),
                    classname: name,
                },
            },
            path,
        },
    };
};

const createPropertiesJSON = (brand, data) => {
    const result = {};
    const destPath = `${paths.build.root}${brand}/properties/css-utilities.json`;

    data.root.walkRules(function (rule) {
        const decls = [];

        rule.walkDecls(({ prop, value }) => {
            decls.push(`${prop}: ${value}`);
        });

        Object.assign(result, createProperty(rule.selector, decls, 'temp'));
    });

    fs.writeFileSync(destPath, JSON.stringify(result, null, 2));
};

module.exports = createPropertiesJSON;
