const { convertCSS } = require('./convertCSS');

const STYLED_COMPONENT_REGEX = /styled((\.(?<tag>\w+)(<[\w{}:;\s'"$?]+>)?)|(\((?<component>\w+)\)))`(?<css>[\n\s\w/а-яА-ЯёЁ%:;\-&{},.]+)`/gm;

/**
 * @param {string} value 
 * @returns {string}
 */
function convertStyledComponents(value) {
    const matches = [...value.matchAll(STYLED_COMPONENT_REGEX)]
        .map(match => {
            const { tag, component, css } = match.groups;
            let tagOrComponent = tag || component;
            if (tag) {
                tagOrComponent = `"${tagOrComponent}"`;
            }

            return ({
                styledComponent: match[0],
                stitches: `styled(${tagOrComponent}, ${convertCSS(css)})`
            })
        });

    let result = value;
    for (const match of matches) {
        result = result.replace(match.styledComponent, match.stitches);
    }

    return result;
}

exports.convertStyledComponents = convertStyledComponents;