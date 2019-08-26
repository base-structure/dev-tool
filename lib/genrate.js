#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var template = require('art-template')
var utils = require('./utils.js')
var config = require('./config.js')

const templatePath = config.templatePath


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
    let templates = config.commands[command].template

    if (!config.commands.hasOwnProperty(command)) {
        console.log('Command Error!')
        return
    }
    if (!templates.hasOwnProperty(type)) {
        console.log('Options type Error!')
        return
    }

    let tmpl = templates[type]
    let ext = config.commands[command].ext

    let filename = options.filename
    filename = utils.getFileName(filename, ext)

    fs.readFile(path.join(templatePath, tmpl), function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        var fullPath = utils.getFullPath(filename, ext)
        var targetPath = path.dirname(fullPath)
        utils.makeDir(targetPath)

        var ret = template.render(data.toString(),{})
        fs.writeFile(fullPath, ret,function(err){
            if(err) {
                console.log(err)
                return
            }
            console.log('[create file success]: ', fullPath)
        })
    })
}

module.exports = genrate
