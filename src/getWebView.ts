import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import http from "./api/http";
import { getHtml } from "./detail";
let currentPanel: vscode.WebviewPanel | undefined = undefined;
const getwebViewDetail = async (body: any, header: any) => {
  const res = await http.post(
    "https://ruankaokao.com/api/question/chapter/practice/list",
    body,
    header
  );
  return res;
};
export default (context: any) => {
  // 注册命令
  vscode.commands.registerCommand(
    "extension.treeItemClick",
    async (element) => {
      const localToken = vscode.workspace
        .getConfiguration()
        .get("ruankao-token");
      let headerToken;
      const getToken = async () => {
        const token = await vscode.window.showInputBox({
          prompt: "请输入token（请登陆ruankaokao.com并复制用户token）",
        });
        headerToken = token;
        await vscode.workspace
          .getConfiguration()
          .update("ruankao-token", token, vscode.ConfigurationTarget.Global);
      };

      // vscode.workspace.getConfiguration().update('ruankao-token', undefined, vscode.ConfigurationTarget.Global)
      while (true) {
        try {
          if (!localToken) {
            await getToken();
          } else {
            headerToken = localToken;
          }
          const res = await getwebViewDetail(
            { chapterId: element.id + "", reset: 1 },
            {
              Authorization: headerToken,
              Knowledge: element.Knowledge,
            }
          );
          if (res.code === 200) {
            vscode.window.showInformationMessage("获取成功");
            if (currentPanel) {
                currentPanel.dispose();
              }
              currentPanel = vscode.window.createWebviewPanel(
              "detailWebview",
              element.label,
              vscode.ViewColumn.One,
              {
                enableScripts: true,
              }
            );
            currentPanel.webview.html = getHtml({
              title: element.label,
              questionList: res.data.questionList,
            });
            break;
          } else if (res.code === 401) {
            vscode.window.showErrorMessage("token过期，请重新登陆");
            vscode.workspace
              .getConfiguration()
              .update(
                "ruankao-token",
                undefined,
                vscode.ConfigurationTarget.Global
              );
          } else {
            break;
          }
        } catch (error) {
          break;
        }
      }
    }
  );
};
