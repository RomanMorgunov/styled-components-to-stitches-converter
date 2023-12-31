const { readFile, writeFile } = require('node:fs/promises')
const { findAsync } = require("fs-jetpack");

const { convertImport } = require('./convertImport');
const { convertStyledComponents } = require('./convertStyledComponents');

const ENCODING = 'utf8';
const STYLE_COMPONENT_FILE_EXTENSIONS = ['*.ts', '*.tsx', '*.js', '*.jsx']

/**
 * @param {string} dirPath 
 */
async function convertStyleFiles(dirPath) {
    const filePaths = await findStyleComponentFiles(dirPath);
    const convertFilePromises = filePaths.map(convertFile);
    await Promise.allSettled(convertFilePromises);
}

/**
 * @param {string} dirPath
 * @returns {string[]}
 */
async function findStyleComponentFiles(dirPath) {
    return await findAsync(dirPath, { matching: STYLE_COMPONENT_FILE_EXTENSIONS });
}

/**
 * @param {string} filePath
 */
async function convertFile(filePath) {
    let fileText = await readFile(filePath, ENCODING);

    fileText = convertImport(fileText);
    fileText = convertStyledComponents(fileText);

    await writeFile(filePath, fileText, ENCODING);
}

exports.convertStyleFiles = convertStyleFiles;
