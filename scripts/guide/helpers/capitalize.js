module.exports = (words) => {
    const format = (part) => part.charAt(0).toUpperCase() + part.slice(1);

    if (Array.isArray(words)) {
        return words.map(format).join(' ');
    }

    return format(words);
};
