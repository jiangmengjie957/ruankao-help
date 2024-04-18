// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import initList from "./initList";
import { getList } from "./utils/service";
import getWebView from "./getWebView";

const getInitList = async () => {
  const list1 = await getList("1");
  const list2 = await getList("2");
  const list3 = await getList("3");
  initList({ list1, list2, list3 });
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ruankao-help" is now active!');
  getInitList();
  getWebView(context);
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "ruankao-help.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      vscode.window.showInformationMessage("Hello World from ruankao-help!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
