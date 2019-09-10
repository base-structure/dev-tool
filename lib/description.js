var fs = require('fs')
var path = require('path')
var utils = require('./utils.js')
var config = require('./config.js')
var template = require('art-template')
var descProject = require('./desc-project.js')
var execSync = require('child_process').execSync

const templatePath = config.templatePath
const descfiles = '.descfiles'
const gitignore = '.gitignore'
const defaultSkip = [
    'bmp',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'svg',
    'ttf',
    'node_modules'
]

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
    let basename = path.basename(filename).toLowerCase().replace(/\./g, '-') + config.desc.ext
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
    var skip = defaultSkip
    var templateContent = ''

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
                        let data = {
                            'source': relativePath
                        }
                        let ret = template.render(templateContent.toString(), data)
                        fs.writeFile(target, ret, function(err){
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

    function readGitignoreFile(callback) {
        let gitignoreFile = path.resolve(currentPath, './' + gitignore)
        if (!fs.existsSync(gitignoreFile)) {
            // updateIngoreFile(gitignoreFile)
            callback()
            return
        }

        fs.readFile(gitignoreFile, function (err, content) {
            if (err) {
                console.log(err)
                return
            }
            // updateIngoreFile(gitignoreFile)
            try {
                let skipArr = []
                if (content.indexOf('\r\n')) {
                    // windows
                    skipArr = content.toString().split('\r\n')
                } else {
                    skipArr = content.toString().split('\n')
                }
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

            callback()
        })
    }

    fs.readFile(path.join(templatePath, config.desc.template), function (err, content) {
        if (err) {
            console.log(err)
            return
        }
        templateContent = content
        readGitignoreFile(function() {
            walk(currentPath)
        })
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

function commit(options) {
    let env = options.env || 'default'
    let project = options.project || null
    let root = descProject.root
    let projs = descProject.projects[env]

    if (project) {
        if (!projs[project]) {
            console.log("Project not exists!")
            return
        }
        let from = path.resolve(projs[project], descfiles)
        let to = path.resolve(root, project)

        console.log("[start copy project]: " + project)
        console.log("[from]: " + from)
        console.log("[to]: " + to)

        utils.makeDir(to)
        utils.copyDirectory(from, to)
    } else {
        for (var proj in projs) {
            let from = path.resolve(projs[proj], descfiles)
            let to = path.resolve(root, proj)

            console.log("[start copy project]: " + proj)
            console.log("[from]: " + from)
            console.log("[to]: " + to)

            utils.makeDir(to)
            utils.copyDirectory(from, to)
        }
    }
}

function update(options) {
    let env = options.env || 'default'
    let project = options.project || null
    let root = descProject.root
    let projs = descProject.projects[env]

    if (project) {
        if (!projs[project]) {
            console.log("Project not exists!")
            return
        }
        let to = path.resolve(projs[project], descfiles)
        let from = path.resolve(root, project)

        console.log("[start update project]: " + project)
        console.log("[from]: " + from)
        console.log("[to]: " + to)

        utils.makeDir(to)
        utils.copyDirectory(from, to)
    } else {
        for (var proj in projs) {
            let to = path.resolve(projs[proj], descfiles)
            let from = path.resolve(root, proj)

            console.log("[start update project]: " + proj)
            console.log("[from]: " + from)
            console.log("[to]: " + to)

            utils.makeDir(to)
            utils.copyDirectory(from, to)
        }
    }
}

function push(options) {
    function run(strs) {
        strs.forEach(item => {
            console.log('[exec]: cd ' + root + ' && ' + item)
            if(!execSync('cd ' + root + ' && ' + item)) {
                console.log('exec error!')
            }
        })
    }

    let root = descProject.root
    let msg = options.message || "auto commit"
    let branch = options.branch || "master"
    try {
        run([
            'git stash',
            'git checkout ' + branch,
        ])
    } catch(err) {
        throw(err)
        return
    }

    try {
        run([
            'git stash pop',
        ])
    } catch(err) {
    }

    try {
        run([
            'git add .',
            'git commit -m "' + msg + '"',
        ])
    } catch (err) {
        console.log('未发现改动')
        return
    }

    try {
        run([
            'git pull -r',
            'git push origin ' + branch,
        ])
    } catch (err) {
        throw err
    }
}

module.exports = {
    init,
    commit,
    update,
    push
}
