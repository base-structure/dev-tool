const vscode = require('vscode');

function activate(context) {
	require('./src/commands')(context);
	require('./src/hover')(context);
	require('./src/jump')(context);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
