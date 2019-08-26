#!/usr/bin/env node

/**
 * @module utils
 *
 * Provide utils methods for project.
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');

/**
 * @method makeDir
 *
 * @param  {String}  dirpath   File paths to be created
 * @return {boolean}           If makeDir success
 */
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

/**
 * @method getFullPath
 * Generate file full path with file extension by file name and ext
 *
 * @param  {String}  filename   Filename or path
 * @param  {String}  ext        File extension
 * @return {String}             File full path
 */
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

/**
 * @method getFileName
 * Return A non-existent filename
 *
 * @param  {String}  baseName   Filename or path
 * @param  {String}  ext        File extension
 * @return {String}             Filename
 */
function getFileName(ext, baseName) {
    if (!baseName) {
        baseName = moment().format('MM/DD');
    }
    var index = 1;
    var filename;
    var fileExists = false;

    do {
        filename = baseName + '.' + index;
        filename = getFullPath(filename, ext);
        if (fs.existsSync(filename)) {
            fileExists = true;
        } else {
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
