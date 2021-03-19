const filterProps = (props, attrs) => {
    if (!attrs) return Object.values(props);

    return Object.values(props).filter(({ attributes }) => {
        return Object.entries(attrs).every(
            ([key, value]) => attributes[key] === value
        );
    });
};

module.exports = (props, attrs = null, flatten = true) => {
    const properties = filterProps(props, attrs);

    return properties.reduce((accum, property) => {
        const key = property.attributes.identity.name;

        if (flatten) accum[key] = property.value;
        else accum[key] = property;

        return accum;
    }, {});
};
