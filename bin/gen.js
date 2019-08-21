#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var colors = require( "colors");
var html = require( "../lib/html");

var targetPath = process.cwd();

program
  .version('1.0.0')

program
    .command('html <name>')
    .description('Generate HTML')
    .action(function(name, options){
        html.gen(name);
        console.log('Create %s', name, options);
    });

program.parse(process.argv);
