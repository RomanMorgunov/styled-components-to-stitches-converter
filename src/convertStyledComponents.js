const { convertCSS } = require('./convertCSS');

const STYLED_COMPONENT_REGEX = /styled\.(?<tag>\w+)`(?<css>[\n\s\w:;\-&{},.]+)`/g;

/**
 * @param {string} value 
 * @returns {string}
 */
function convertStyledComponents(value) {
    const matches = [...value.matchAll(STYLED_COMPONENT_REGEX)]
        .map(match => ({
            styledComponent: match[0],
            stitches: `styled("${match.groups.tag}", ${convertCSS(match.groups.css)})`
        }));

    let result = value;
    for (const match of matches) {
        result = result.replace(match.styledComponent, match.stitches);
    }

    return result;
}

exports.convertStyledComponents = convertStyledComponents;