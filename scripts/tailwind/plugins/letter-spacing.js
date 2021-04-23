// https://tailwindcss.com/docs/plugins
module.exports = (props) => {
    return ({ addUtilities }) => {
        const utils = {};

        Object.entries(props).forEach(([name, value]) => {
            utils[`.letter-spacing-${name}`] = {
                'letter-spacing': value,
            };
        });

        addUtilities(utils);
    };
};
