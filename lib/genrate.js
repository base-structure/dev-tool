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
    let item = config.commands[command]
    let templates = item.template

    if (!config.commands.hasOwnProperty(command)) {
        console.log('Command Error!')
        return
    }
    if (!templates.hasOwnProperty(type)) {
        console.log('Options type Error!')
        return
    }

    let tmpl = templates[type]
    let ext = item.ext
    let basePath = item.basePath
    let filename = utils.getFileName(basePath, options.filename, ext)

    fs.readFile(path.join(templatePath, tmpl), function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        let fullPath = utils.getFullPath(filename, ext)
        let targetPath = path.dirname(fullPath)
        utils.makeDir(targetPath)

        let ret = template.render(data.toString(),{})
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
