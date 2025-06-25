// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as lsp from 'vscode-languageclient/node';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Kast has been activated');

	const lsp = start_lsp(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('kast.restart_lsp', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Restarting Kast lsp');
		lsp.restart();
	});

	context.subscriptions.push(disposable);

}

function start_lsp(context: vscode.ExtensionContext): lsp.LanguageClient {
	const serverOptions: lsp.ServerOptions = {
		command: 'kast', // Replace with your own command.
		args: ['lsp'],
	};

	const clientOptions: lsp.LanguageClientOptions = {
		documentSelector: [
			// Active functionality on files of these languages.
			{
				language: 'kast',
			}
		],
	};

	const client = new lsp.LanguageClient('Kast Language Server', serverOptions, clientOptions);
	client.start();

	return client;
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log("Kast has been deactivated")
}
