var path = require('path')

const templatePath = path.resolve(__dirname, '../template')

const commands = {
    html: {
        ext: 'html',
        template: {
            default: 'html/default.html'
        }
    },
    mongo: {
        ext: 'js',
        template: {
            default: 'mongo/default.js',
            print: 'mongo/print.js'
        }
    },
    todo: {
        ext: 'todo.md',
        template: {
            default: 'todo/default.md'
        }
    },
    testjs: {
        basePath: 'test/',
        ext: 'test.js',
        template: {
            default: 'js/default.test.js'
        }
    }
}

module.exports = {
    templatePath,
    commands
}
