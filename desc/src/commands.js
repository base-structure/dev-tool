const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const config = require("./config");

module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.desc',  (uri) => {
        let fileName = uri ? uri.path : "";
        const workDir     = path.dirname(fileName);

        let current = workDir;
        let parent = path.resolve(current, "../");
        do {
            let descPath = path.resolve(current, config.descfiles);
            if (fs.existsSync(descPath)) {
                let relativePath = path.relative(current, fileName);
                if (relativePath.startsWith(config.descfiles)) {
                    break;
                }
                // 文件名中`.`转为`-`并加后缀 `.json`
                let currentDescFile = path.resolve(descPath, relativePath);
                let dirname = path.dirname(currentDescFile)
                let basename = path.basename(currentDescFile).toLowerCase().replace(/\./g, "-") + ".json";
                currentDescFile = path.resolve(dirname, basename);
    
                if (!fs.existsSync(currentDescFile)) {
                    break;
                }
                vscode.window.showInformationMessage(currentDescFile);
                let { document } = vscode.window.activeTextEditor;
                let newUri = document.uri.with({ path: currentDescFile });
                vscode.window.showTextDocument(newUri, { preview: false });
            }
            current = parent;
            parent = path.resolve(current, "../");
        } while (current !== parent);
	}));
};
