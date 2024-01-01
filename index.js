#!/usr/bin/env node

const { convertStyleFiles } = require('./src');

const projectPath = process.argv[2];

if (!projectPath) {
    console.error('You should specify project folder');
    return;
}

convertStyleFiles(projectPath);
