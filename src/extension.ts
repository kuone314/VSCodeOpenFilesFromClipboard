import * as vscode from 'vscode';

///////////////////////////////////////////////////////////////////////////////////////////////////
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('open-files-from-clipboard', async () => {
		const orgStr = await vscode.env.clipboard.readText();
		const pathAry = orgStr.split(/\r\n|\n/);
		const classfied = await classfyPathAry(pathAry);

		if (classfied.unfounds.length !== 0) {
			vscode.window.showErrorMessage(infoMessage(classfied.unfounds));
		}

		for (const filePath of classfied.files) {
			const fileUri = vscode.Uri.file(filePath)
			vscode.commands.executeCommand('vscode.open', fileUri, {
				preview: false,
				preserveFocus: false,
			});
		}

		for (const dirPath of classfied.dirs) {
			const fileUri = vscode.Uri.file(dirPath);
			vscode.commands.executeCommand('vscode.openFolder', fileUri, true);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

///////////////////////////////////////////////////////////////////////////////////////////////////
interface ClassfiedPathAry {
	dirs: string[],
	files: string[],
	unfounds: string[],
}
async function classfyPathAry(pathAry: string[]): Promise<ClassfiedPathAry> {
	let result: ClassfiedPathAry = { dirs: [], files: [], unfounds: [], };

	for (const path of pathAry) {
		if (path.length === 0) { continue; }

		let fileState;
		try {
			fileState = await vscode.workspace.fs.stat(vscode.Uri.file(path));
		} catch (e) {
			result.unfounds.push(path);
			continue;
		}

		const isFile = fileState.type & vscode.FileType.File;
		if (isFile) {
			result.files.push(path);
			continue;
		}

		const isDirectory = fileState.type & vscode.FileType.Directory;
		if (isDirectory) {
			result.dirs.push(path);
			continue;
		}

		result.unfounds.push(path);
	}

	return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function infoMessage(unfondPathAry: string[]): string {
	return 'Unfond file: ' + unfondPathAry.join(', ');
}
