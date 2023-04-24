import * as vscode from 'vscode';
import * as request from 'request';

import { MyCompletionItemProvider } from './myCompletionItemProvider';


let timeout: NodeJS.Timer | undefined;
let preText = "";

function handleGenerateCode(context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem, provider: MyCompletionItemProvider) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const cursorPosition = editor.selection.active;
    // const textBeforeCursor = editor.document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
    const selection = new vscode.Selection(
        0,
        0,
        cursorPosition.line,
        cursorPosition.character
    );
    let textBeforeCursor = editor.document.getText(selection);
    if (textBeforeCursor.length === 0) {
      return;
    }
    let config = vscode.workspace.getConfiguration(undefined, null);
    const address = config.get("server.address") as string;
    const port = config.get("server.port") as number;
    const generatorLength = config.get("generator.length") as number;
    const chunkLength = config.get("chunk.length") as number;
    const url = `http://${address}:${port}/gen/`;
    // console.log("url is ", url);
    let payload = {};
    if (textBeforeCursor !== preText) {
      payload = {
        msg: "+gen " + textBeforeCursor,
        generatorLength: generatorLength,
        chunkLength: chunkLength
      };
    } else {
      payload = {
        msg: "+++ ",
        generatorLength: generatorLength,
        chunkLength: chunkLength
      };
    }
    
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {"Content-Type": "application/json"}
    };
    statusBarItem.text = "Generating code...";
    statusBarItem.show();
    request.post(url, options, (error, response, body) => {
      if (error) {
        console.error(error);
        vscode.window.showErrorMessage('Failed to connect RWKV Novel API');
        return;
      }
      if (response.statusCode !== 200) {
        console.log("response", response);
        return;
      }
      const data = JSON.parse(body) as vscode.CompletionItem[];
      console.log("data", JSON.stringify(data));
      provider.data = data;
      if (data.length > 0) {
        if (data[0].insertText) {
          preText = textBeforeCursor + data[0].insertText;
        }
      }
      // 触发自动完成
      vscode.commands.executeCommand('editor.action.triggerSuggest');
      statusBarItem.text = "RWKV Copilot activated";
      statusBarItem.show();
    });
  }
}

function handleTextChange(context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem, provider: MyCompletionItemProvider) {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    handleGenerateCode(context, statusBarItem, provider);
  }, 2000);
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
	'rwkv-copilot.helloWorld', handleGenerateCode
  );
  context.subscriptions.push(disposable);

  let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = "RWKV Copilot activated";
  statusBarItem.show();

  // 注册 CompletionItemProvider
  const provider = new MyCompletionItemProvider([]);
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file', language: 'plaintext' },
      provider
    )
  );

  vscode.workspace.onDidChangeTextDocument(event => {
    console.log("languageId", event.document.languageId);
    if (event.document.languageId === 'plaintext') {
      handleTextChange(context, statusBarItem, provider);
    }
  });
}