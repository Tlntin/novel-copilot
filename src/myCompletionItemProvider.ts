import * as vscode from 'vscode';

export class MyCompletionItemProvider implements vscode.CompletionItemProvider {
  public data: vscode.CompletionItem[];

  constructor(data: vscode.CompletionItem[]) {
    this.data = data;
  }

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const completionItems: vscode.CompletionItem[] = [];

    // Convert the data to completion items
    for (const item of this.data) {
      const completionItem = new vscode.CompletionItem(item.label);
      // completionItem.detail = item.detail;
      // completionItem.kind = vscode.CompletionItemKind.Text;
      // completionItem.insertText = item.insertText;
      const documentation = new vscode.MarkdownString();
      if (typeof item.insertText === 'string') {
        documentation.appendText(item.insertText);
      } else if (item.insertText) {
        documentation.appendCodeblock(item.insertText.value, "text");
      }
      completionItem.documentation = documentation;
      completionItems.push(completionItem);
    }

    // Create a CompletionList with the items and a default item
    return completionItems;
  }
}