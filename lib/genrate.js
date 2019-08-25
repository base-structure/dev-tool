#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var template = require('art-template');
var utils = require('./utils.js');

const templatePath = path.resolve(__dirname, '../template');

const templateMap = {
    mongo: {
        default: 'mongo/default.js'
    },
    html: {
        default: 'html/default.html'
    }
}

const fileExt = {
    mongo: 'js',
    html: 'html'
}

function gen(command, options) {
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
        });
    });
}

module.exports = gen
