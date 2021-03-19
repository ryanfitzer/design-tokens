module.exports = (array, delimiter = '', start = 0) => {
    const result = array.map((part, index) => {
        if (index < start) return part;

        return part.charAt(0).toUpperCase() + part.slice(1);
    });

    return typeof delimiter !== 'undefined' ? result.join(delimiter) : result;
};
