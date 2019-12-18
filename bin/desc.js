#!/usr/bin/env node

var path = require('path')
var program = require('commander')
var program = require('commander')
var description = require( './src/description')

var targetPath = process.cwd()

program
  .version('1.0.0')

program
    .command('init')
    .description('init desc files')
    .action(function(options){
        description.init(options)
    })

// 配置文件中的项目路径复制到root路径下
program
    .command('commit')
    .description('commit description files')
    .option('-e, --env <env>', 'env name')
    .option('-p, --project <project>', 'project name')
    .option('-l, --link [type]', 'link desc files')
    .action(function(options){
        description.commit(options)
    })

// 删除源项目,从root下创建软链接
program
    .command('link')
    .description('link description files')
    .option('-e, --env <env>', 'env name')
    .option('-p, --project <project>', 'project name')
    .option('-r, --remove [type]', 'remove link desc files')
    .action(function(options){
        description.link(options)
    })

program
    .command('update')
    .description('update description files')
    .option('-e, --env <env>', 'env name')
    .option('-p, --project <project>', 'project name')
    .action(function(options){
        description.update(options)
    })

// 提交代码到远程
program
    .command('push')
    .description('push description files')
    .option('-m, --message <message>', 'commit message')
    .option('-b, --branch <branch>', 'commit branch')
    .action(function(options){
        description.push(options)
    })

program.parse(process.argv)
