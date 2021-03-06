#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var template = require('art-template')
var utils = require('./utils.js')
var config = require('./config.js')
var execSync = require('child_process').execSync
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
    let data = item.data && item.data[type] || {}
    let cmd = item.cmd || ''
    if (data) {
        if (Object.prototype.toString.call(data) === '[object Function]') {
            data = data()
        }
    }

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

    fs.readFile(path.join(templatePath, tmpl), function (err, content) {
        if (err) {
            console.log(err)
            return
        }
        let fullPath = utils.getFullPath(filename, ext)
        let targetPath = path.dirname(fullPath)
        utils.makeDir(targetPath)

        let ret = template.render(content.toString(), data)
        fs.writeFile(fullPath, ret,function(err){
            if(err) {
                console.log(err)
                return
            }
            console.log('[create file success]: ', fullPath)
            if (cmd) {
                cmd = cmd.replace('$f', fullPath);
                console.log(cmd)
                execSync(cmd);
            }
        })
    })
}

module.exports = genrate
