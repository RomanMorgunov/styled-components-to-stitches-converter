/**
 * @param {string} value 
 * @returns {boolean}
 */
function isFirstLetter(value) {
    const firstCharCode = value.charCodeAt?.(0);
    return (firstCharCode >= 65 && firstCharCode <= 90) || (firstCharCode >= 97 && firstCharCode <= 122);
}

exports.isFirstLetter = isFirstLetter;
