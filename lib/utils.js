#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split('/').forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                if(dirname){
                    pathtmp = dirname;
                }else{
                    pathtmp = '/';
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }
    return true;
}

function getFullPath(filename, ext) {
    var fullPath = path.resolve(process.cwd(), filename);
    if (!fullPath) {
        throw 'Error Filepath not exist!';
    }
    if (ext && !fullPath.endsWith('.' + ext)) {
        fullPath = [fullPath, '.', ext].join('');
    }
    return fullPath;
}

module.exports = {
    makeDir,
    getFullPath
}
