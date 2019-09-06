const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const config = require("./config");

/**
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
    const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);
    const word        = document.getText(document.getWordRangeAtPosition(position));

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
            try {
                let result = JSON.parse(fs.readFileSync(currentDescFile, "utf8"));
                let desc = (result.descs || {})[word];
                if (desc) {
                    return new vscode.Location(vscode.Uri.file(currentDescFile), new vscode.Position(0, 0));
                }
            } catch (err) {
            }
        }
        current = parent;
        parent = path.resolve(current, "../");
    } while (current !== parent);
}

module.exports = function(context) {
    context.subscriptions.push(vscode.languages.registerDefinitionProvider("*", {
        provideDefinition
    }));
};
