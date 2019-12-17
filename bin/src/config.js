var path = require('path')

const templatePath = path.resolve(__dirname, 'template')

var moment = require('moment');

const commands = {
    html: {
        ext: 'html',
        template: {
            default: 'html/default.html'
        }
    },
    sql: {
        ext: 'sql',
        template: {
            default: 'sql/default.sql'
        },
        data: {
            default: () => {
                var now = moment();
                return {
                    time: now.format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }
    },
    sh: {
        ext: 'sh',
        template: {
            default: 'sh/default.sh'
        },
        cmd: 'chmod +x $f',
        data: {
            default: () => {
                var now = moment();
                return {
                    time: now.format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }
    },
    mongo: {
        ext: 'js',
        template: {
            default: 'mongo/default.js',
            update: 'mongo/update.js',
            print: 'mongo/print.js',
            modify: 'mongo/modify.js'
        }
    },
    todo: {
        ext: 'todo.md',
        template: {
            default: 'todo/default.md'
        },
        data: {
            default: () => {
                var now = moment();
                return {
                    time: now.format('YYYY-MM-DD HH:mm:ss')
                }
            }
        }
    },
    tasks: {
        ext: 'tasks',
        template: {
            default: 'todo/default.md'
        },
        data: {
            default: () => {
                var now = moment();
                return {
                    time: now.format('YYYY-MM-DD HH:mm:ss')
                }
            }
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

const desc = {
    ext: '.json',
    template: 'desc/default.json'
}

module.exports = {
    desc,
    templatePath,
    commands,
}
