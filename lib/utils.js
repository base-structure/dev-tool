#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var moment = require('moment');

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
    return fullPath + '';
}

function getFileName(ext) {
    var date = moment().format('MMDD');
    var index = 1;
    var filename;
    var fileExists = false;

    do {
        filename = date + '.' + index;
        filename = getFullPath(filename, ext);
        try{
            fs.accessSync(filename, fs.F_OK);
            fileExists = true;
        }catch(e){
            fileExists = false;
        }
        index++;
    } while (fileExists);
    return filename;
}

module.exports = {
    makeDir,
    getFullPath,
    getFileName
}
