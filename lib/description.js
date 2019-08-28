var fs = require('fs')
var path = require('path')
var utils = require('./utils.js')

const descfiles = '.descfiles'
const gitignore = '.gitignore'

let currentPath = process.cwd()

function getDesc (relativePath) {
    let descPath = path.resolve(currentPath, './' + descfiles)
    return path.resolve(descPath, relativePath)
}

function getDescFile (filename) {
    if (!filename) {
        throw Error('filename is required!')
    }
    let dirname = path.dirname(filename)
    let basename = path.basename(filename).toLowerCase().replace(/\./g, '-') + '.md'
    return path.resolve(dirname, basename)
}

function updateIngoreFile (gitignoreFile) {
    fs.appendFile(gitignoreFile, '\n' + descfiles + '\n', function(err, fd) {
        if (err) {
            return console.error(err);
        }
    })
}

function genDescFiles (descPath) {
    var skip = []

    function walk(walkpath){
        var dirList = fs.readdirSync(walkpath)

        dirList.forEach(function(item){
            let current = walkpath + '/' + item
            let relativePath = path.relative(currentPath, current)
            let ignore = false

            if (item.startsWith('.')) {
                ignore = true
            } else {
                skip.forEach(item => {
                    if(relativePath.match(item)) {
                        ignore = true
                    }
                })
            }

            if (!ignore) {
                let target = getDesc(relativePath)
                if(fs.statSync(current).isDirectory()){
                    utils.makeDir(target)
                    walk(current)
                }else{
                    target = getDescFile(target)
                    if (!fs.existsSync(target)) {
                        fs.writeFile(target, '', function(err){
                            if(err) {
                                console.log(err)
                                return
                            }
                            console.log('[create file success]: ', target)
                        })
                    }
                }
            }
        });
    }

    let gitignoreFile = path.resolve(currentPath, './' + gitignore)
    if (!fs.existsSync(gitignoreFile)) {
        fs.appendFile(gitignoreFile, descfiles + '\n', function(err, fd) {
            if (err) {
                return console.error(err);
            }
        })
        walk(currentPath)
        return
    }

    fs.readFile(gitignoreFile, function (err, content) {
        if (err) {
            console.log(err)
            return
        }
        try {
            let skipArr = content.toString().split('\n')
            skipArr.forEach(item => {
                if (item) {
                    skip.push(item)
                }
            })
            if (skipArr.indexOf(descfiles) === -1) {
                let data = descfiles + '\n'
                if (!content.toString().endsWith('\n')) {
                    data = '\n' + data
                }
                fs.appendFile(gitignoreFile, data, function(err, fd) {
                    if (err) {
                        return console.error(err);
                    }
                })
            }
        } catch(err) {

        }

        walk(currentPath)
    })
}

function init() {
    let descPath = path.resolve(currentPath, './' + descfiles)
    if (fs.existsSync(descPath)) {
        console.log('Desc files has exists!')
        return
    }
    utils.makeDir(descPath)
    genDescFiles(descPath)
}

function update() {
    let descPath = path.resolve(currentPath, './' + descfiles)
    if (!fs.existsSync(descPath)) {
        console.log('Desc files not exists!')
        return
    }
    genDescFiles(descPath)
}

module.exports = {
    init,
    update
}
