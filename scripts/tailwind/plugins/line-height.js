// https://tailwindcss.com/docs/plugins
module.exports = (props) => {
    return ({ addUtilities }) => {
        const utils = {};

        Object.entries(props).forEach(([name, value]) => {
            utils[`.line-height-${name}`] = {
                'line-height': value,
            };
        });

        addUtilities(utils);
    };
};
