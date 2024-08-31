import * as vscode from 'vscode';
import { scanDependencies } from './dependencyScanner';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.checkDependencies', async () => {
        const folders = vscode.workspace.workspaceFolders;
        if (folders) {
            const folder = folders[0].uri.fsPath;
            try {
                await scanDependencies(folder);
                vscode.window.showInformationMessage('Dependency scan complete.');
            } catch (error: unknown) {
                vscode.window.showErrorMessage(`Error scanning dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        } else {
            vscode.window.showInformationMessage('No folder open.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
