#!/usr/bin/env node

var path = require('path')
var program = require('commander')
var colors = require( 'colors')
var genrate = require( '../lib/genrate')
var config = require('../lib/config.js')

var targetPath = process.cwd()

program
  .version('1.0.0')

Object.keys(config.commands).forEach(itemName => {
    let item = config.commands[itemName]
    let types = Object.keys(item.template).join(', ')

    program
        .command(itemName)
        .description('Generate HTML')
        .option('-f, --filename <filename>', '文件名')
        .option('-t, --type <type>', '类型    [' + types + ']')
        .action(function(options){
            genrate(itemName, options)
        })
})

program.parse(process.argv)
