#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var template = require('art-template');
var utils = require('./utils.js');
var config = require('./config.js');

const templatePath = config.templatePath;
const templateMap = config.templateMap;
const fileExt = config.fileExt;


/**
 * @method genrate
 * create file by options
 *
 * @param  {Object}  options
 *    type        File Type for match template
 *    filename    Target filename
 * @return {boolean}           If makeDir success
 */
function genrate(command, options) {
    let type = options.type || 'default'
    if (!templateMap.hasOwnProperty(command)) {
        console.log('Command Error!')
        return
    }
    if (!templateMap[command].hasOwnProperty(type)) {
        console.log('Options type Error!')
        return
    }

    let tmpl = templateMap[command][type]
    let ext = fileExt[command]

    let filename = options.filename
    if (!filename) {
        filename = utils.getFileName(ext)
    }

    fs.readFile(path.join(templatePath, tmpl), function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var fullPath = utils.getFullPath(filename, ext);
        var targetPath = path.dirname(fullPath);
        utils.makeDir(targetPath);

        var ret = template.render(data.toString(),{});
        fs.writeFile(fullPath, ret,function(err){
            if(err) {
                console.log(err);
                return;
            }
            console.log('[create file success]: ', filename)
        });
    });
}

module.exports = genrate
