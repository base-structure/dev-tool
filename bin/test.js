#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var colors = require( "colors");

const templatePath = path.resolve(__dirname, './template');
var targetPath = process.cwd();
if (program.target) {
    targetPath = path.resolve(process.cwd(), program.target);
}

program
  .version('1.0.0')
  .option('--type [value]', 'Generate layout type')
  .option('-f, --filename [value]', 'Target filename')

program
    .command('layout <name>')
    .option('--type [value]', 'Generate layout type')
    .option('-f, --filename [value]', 'Target filename')
    .description('Generate HTML amd css')
    .action(function(name, options){
        console.log('Create %s', name, options.filename);
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
