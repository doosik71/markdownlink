"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    console.log('Your extension "markdownLink" is now active!');
    let disposable = vscode.commands.registerCommand('extension.toMarkdownLink', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Get the selected text
            const selectedText = document.getText(selection);
            // Convert to markdown link
            const sanitizedFileName = selectedText
                .replace(/ /g, '_') // Replace spaces with underscores
                .replace(/[^\w_]/g, ''); // Remove special characters
            const markdownLink = `[${selectedText}](${sanitizedFileName}.md)`;
            // Replace the selected text with the markdown link
            editor.edit(editBuilder => {
                editBuilder.replace(selection, markdownLink);
            });
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map