import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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

export function deactivate() {}
