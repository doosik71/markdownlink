import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Your extension "markdownLinkFile" is now active!');

    let disposable = vscode.commands.registerCommand('extension.toMarkdownLinkFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;

            // Get the selected text
            const selectedText = document.getText(selection);

            // Convert to markdown link
            const sanitizedFileName = selectedText
            .replace(/[^\w가-힣]+/g, '_')  // Replace non-word characters except Hangul with underscores
            .replace(/_+/g, '_');  // Reduce multiple underscores to a single underscore

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
