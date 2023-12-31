const STYLED_COMPONENTS_IMPORT_REGEX = /import\s+styled\s+from\s+['"]styled-components['"]\s*;?/m;
const STITCHES_IMPORT = "import { styled } from '@stitches/react';";

/**
 * @param {string} value 
 * @returns {string}
 */
function convertImport(value) {
    return value.replace(STYLED_COMPONENTS_IMPORT_REGEX, STITCHES_IMPORT);
}

exports.convertImport = convertImport;
