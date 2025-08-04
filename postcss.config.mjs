const rootValue = 16;
const unitPrecision = 5;
const valueRegex = /-\[(\d+)px\]/g;

/**
 * convert px to rem
 * @param {string} value - the value to convert
 * @returns {string} the converted value
 */
const transformPxToRem = (value) => {
    // check if the value contains 'px]', which means it might be a Tailwind arbitrary value
    if (value.includes("px]")) {
        // use regex to match the format -[numberpx]
        return value.replace(valueRegex, (match, num) => {
            // convert px to rem
            const remValue = (parseInt(num, 10) / rootValue).toFixed(
                unitPrecision
            );
            // return the converted format -[..rem]
            return `-[${remValue}rem]`;
        });
    }
    // if not the target format, return the original value
    return value;
};

const config = {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-pxtorem": {
            rootValue,
            unitPrecision,
            propList: ["*"],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1, // the minimum pixel value, values less than 1px are not converted
            // custom conversion logic
            transform: transformPxToRem,
        },
    },
};

export default config;
