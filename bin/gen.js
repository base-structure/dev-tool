#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var colors = require( "colors");
var genrate = require( "../lib/genrate");

var targetPath = process.cwd();

program
  .version('1.0.0')

program
    .command('html')
    .description('Generate HTML')
    .option('-f, --filename <filename>', '文件名')
    .option('-t, --type <type>', '类型')
    .action(function(options){
        genrate('html', options);
    });

program
    .command('mongo')
    .description('Generate mongo query file')
    .option('-f, --filename <filename>', '文件名')
    .option('-t, --type <type>', '类型')
    .action(function(options){
        genrate('mongo', options);
    });

program.parse(process.argv);
