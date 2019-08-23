#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var colors = require( "colors");
var genrate = require( "../lib/genrate");

var targetPath = process.cwd();

program
  .version('1.0.0')

program
    .command('html <name>')
    .description('Generate HTML')
    .action(function(name, options){
        genrate('html', name, options);
    });

program
    .command('mongo <name>')
    .description('Generate mongo query file')
    .option('-t, --type <type>', '类型')
    .action(function(name, options){
        genrate('mongo', name, options);
    });

program.parse(process.argv);
