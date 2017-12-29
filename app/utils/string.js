export const toPascalCaseFromKebabCase = (text) => {
    return text
        .split('-')
        .map((word) => word.substr(0, 1).toUpperCase() + word.substr(1))
        .join('');
};
