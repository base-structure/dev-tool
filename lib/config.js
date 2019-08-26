var path = require('path');

const templatePath = path.resolve(__dirname, '../template');

const commands = [
    'html',
    'mongo'
]

const fileExt = {
    html: 'html',
    mongo: 'js'
}

const templateMap = {
    html: {
        default: 'html/default.html'
    },
    mongo: {
        default: 'mongo/default.js',
        print: 'mongo/print.js',
    }
}

module.exports = {
    commands,
    templatePath,
    templateMap,
    fileExt
}
