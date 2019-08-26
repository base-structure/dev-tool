#!/usr/bin/env node

var path = require('path')
var program = require('commander')
var colors = require( 'colors')
var genrate = require( '../lib/genrate')
var config = require('../lib/config.js')

var targetPath = process.cwd()

program
  .version('1.0.0')

Object.keys(config.commands).forEach(item => {
    let types = Object.keys(config.commands[item].template).join(', ')

    program
        .command(item)
        .description('Generate HTML')
        .option('-f, --filename <filename>', '文件名')
        .option('-t, --type <type>', '类型    [' + types + ']')
        .action(function(options){
            genrate(item, options)
        })
})

program.parse(process.argv)
