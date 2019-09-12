const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const utils = require("./utils");

function loadFile(targetFile, word) {
    try {
        let result = JSON.parse(fs.readFileSync(targetFile, "utf8"));
        let desc = (result.descs || {})[word];
        if (utils.isString(desc)) {
            return new vscode.Hover(desc);
        } else if (utils.isArray(desc)) {
            desc = desc.filter(item => {
                return utils.isString(item)
            })
            result = desc.join("\n\n")
            return new vscode.Hover(result);
        } else if (utils.isObject(desc)) {
            let result = "";
            try {
                result = JSON.stringify(desc, null, "\n");
            } catch {
                let arr = [];
                for (let item in desc) {
                    arr.push([item, desc[item]].join(":"));
                }
                result = arr.join("\n\n");
            }
            return new vscode.Hover(result);
        }
    } catch (err) {
    }
    return null;
}

/**
 * @param {*} document
 * @param {*} position
 * @param {*} token
 */
function provideHover(document, position, token) {
    const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);
    const word        = document.getText(document.getWordRangeAtPosition(position, /[a-zA-Z_][\-a-zA-Z0-9_]*/));

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

            let globalFile = path.resolve(descPath, config.globalFile);

            if (loadFile(currentDescFile, word)) {
                return loadFile(currentDescFile, word)
            }

            if (loadFile(globalFile, word)) {
                return loadFile(globalFile, word)
            }
        }
        current = parent;
        parent = path.resolve(current, "../");
    } while (current !== parent);
}

module.exports = function(context) {
    context.subscriptions.push(vscode.languages.registerHoverProvider("*", {
        provideHover
    }));
};
