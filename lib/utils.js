#!/usr/bin/env node

/**
 * @module utils
 *
 * Provide utils methods for project.
 */

var fs = require('fs')
var path = require('path')
var moment = require('moment')

/**
 * @method makeDir
 *
 * @param  {String}  dirpath   File paths to be created
 * @return {boolean}           If makeDir success
 */
function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp
        dirpath.split('/').forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname)
            }
            else {
                if(dirname){
                    pathtmp = dirname
                }else{
                    pathtmp = '/'
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false
                }
            }
        })
    }
    return true
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
    var fullPath = path.resolve(process.cwd(), filename)
    if (!fullPath) {
        throw 'Error Filepath not exist!'
    }
    if (ext && !fullPath.endsWith('.' + ext)) {
        fullPath = [fullPath, '.', ext].join('')
    }
    return fullPath + ''
}

/**
 * @method getFileName
 * Return A non-existent filename
 *
 * @param  {String}  basePath   File basePath
 * @param  {String}  filename   Filename or path
 * @param  {String}  ext        File extension
 * @return {String}             Filename
 */
function getFileName(basePath, filename, ext) {
// function getFileName(baseName, ext) {
    var index = 0
    var currentName
    var fileExists = false

    if (!filename) {
        filename = moment().format('MM/DD')
        index = 1
    }

    if (basePath) {
        filename = basePath + filename
    }

    do {
        if (index === 0) {
            currentName = filename
        } else {
            currentName = filename + '.' + index
        }
        currentName = getFullPath(currentName, ext)
        if (fs.existsSync(currentName)) {
            fileExists = true
        } else {
            fileExists = false
        }
        index++
    } while (fileExists)
    return currentName
}

function copy(src, dst){
    let paths = fs.readdirSync(src)
    paths.forEach(function(path) {
        var _src = src + '/' + path
        var _dst = dst + '/' + path

        fs.stat(_src, function(err,stats) {
            if(err) {
                throw err
            }
            if(stats.isFile()){
                let readable = fs.createReadStream(_src)
                let writable = fs.createWriteStream(_dst)
                readable.pipe(writable)
            } else if(stats.isDirectory()) {
                copyDirectory(_src, _dst, copy)
            }
        })
    })
}

function copyDirectory(src, dst) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if(err) {
            fs.mkdirSync(dst)
            copy(src, dst)
        } else {
            copy(src, dst)
        }
    })
}

module.exports = {
    makeDir,
    getFullPath,
    getFileName,
    copyDirectory,
}
