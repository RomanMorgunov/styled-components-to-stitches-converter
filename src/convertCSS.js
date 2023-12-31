const { camelCase, isString } = require('lodash');
const { compile } = require('stylis');

const { isFirstLetter } = require('./utils');

const AMPERSAND = '&';
const AMPERSAND_REPLACEMENT = '.xxxxxxxxxx';

/**
 * @param {string} css 
 * @returns {string}
 */
function convertCSS(css) {
    // меняем & на шаблон AMPERSAND_REPLACEMENT, чтобы stylis его не удалил
    const withoutAmpersand = replaceAmpersandsToMocks(css);

    const stylisStyleObject = compile(withoutAmpersand);
    const stitchesStyleObject = toStitchesStyleObject(stylisStyleObject);
    const stitchesStyleJSON = JSON.stringify(stitchesStyleObject, null, 2);

    return trimQuotationMarksInProperty(stitchesStyleJSON);
}

/**
 * @param {string | stylis.Element[]} value 
 * @returns {object}
 */
function toStitchesStyleObject(value) {
    if (isString(value)) {
        return value;
    }

    return value
        .map(element => ({ [convertProperty(element.props)]: toStitchesStyleObject(element.children) }))
        .reduce((result, current) => ({ ...result, ...current }), {});
}

/**
 * @param {string | string[]} value 
 * @returns {string}
 */
function convertProperty(value) {
    const props = isString(value) ? [value] : value;

    const mergedProp = props
        .map(prop => isFirstLetter(prop) ? camelCase(prop) : prop)
        .join(', ');

    // возвращаем изначальные символы &
    return replaceMocksToAmpersands(mergedProp);
}

/**
 * @param {string} value
 * @returns {string}
 */
function trimQuotationMarksInProperty(value) {
    return value.replaceAll(/"(?<prop>[a-zA-z]+)":/g, '$<prop>:');
}

/**
 * @param {string} value
 * @returns {string}
 */
function replaceAmpersandsToMocks(value) {
    return value.replaceAll(AMPERSAND, AMPERSAND_REPLACEMENT);
}

/**
 * @param {string} value
 * @returns {string}
 */
function replaceMocksToAmpersands(value) {
    return value.replaceAll(AMPERSAND_REPLACEMENT, AMPERSAND);
}

exports.convertCSS = convertCSS;
