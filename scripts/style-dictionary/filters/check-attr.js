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
