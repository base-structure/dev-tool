#!/usr/bin/env node

var path = require('path')
var program = require('commander')
var genrate = require( './src/genrate')
var config = require('./src/config.js')

var targetPath = process.cwd()

program
  .version('1.0.0')

Object.keys(config.commands).forEach(itemName => {
    let item = config.commands[itemName]
    let types = Object.keys(item.template).join(', ')

    program
        .command(itemName)
        .description('Generate ' + itemName)
        .option('-f, --filename <filename>', '文件名')
        .option('-t, --type <type>', '类型    [' + types + ']')
        .action(function(options){
            genrate(itemName, options)
        })
})

program.parse(process.argv)
