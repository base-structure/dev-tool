#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var template = require('art-template');
var utils = require('./utils.js');

const templatePath = path.resolve(__dirname, '../template');

function gen(filename) {
    if (!filename) {
        return;
    }
    fs.readFile(path.join(templatePath, 'test.html'), function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var fullPath = utils.getFullPath(filename, 'html');
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

module.exports= {
    gen
}
