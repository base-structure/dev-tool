#!/usr/bin/env node

var path = require('path')
var program = require('commander')
var program = require('commander')
var description = require( '../lib/description')

var targetPath = process.cwd()

program
  .version('1.0.0')

program
    .command('init')
    .description('init desc files')
    .action(function(options){
        description.init(options)
    })

program
    .command('update')
    .description('update desc files')
    .action(function(options){
        description.update(options)
    })

program.parse(process.argv)
