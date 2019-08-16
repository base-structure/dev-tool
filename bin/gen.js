#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var colors = require( "colors");
var layout = require( "../lib/layout");

var targetPath = process.cwd();

program
  .version('1.0.0')
  .option('--type [value]', 'Generate layout type')
  .option('-f, --filename [value]', 'Target filename')

program
    .command('layout <filename>')
    .option('--type [value]', 'Generate layout type')
    .description('Generate HTML amd css')
    .action(function(filename, options){
        layout.gen(filename);
    });

program
    .command('html <name>')
    .option('-t, --target [value]', 'Target file path')
    .option('-f, --filename [value]', 'Target filename')
    .description('Generate a base vue file')
    .action(function(name, options){
        console.log('Create %s', name, options.filename);
    });

program.parse(process.argv);
