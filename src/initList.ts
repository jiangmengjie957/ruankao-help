import * as vscode from "vscode";
import http from "./api/http";

const getList = async (type: string) => {
  const res = await http.get(
    `https://ruankaokao.com/api/knowledge/list/${type}`
  );
  console.log(res, "resssss");
  if (res.code === 200) return res.data;
  return [];
};

const getSubList = async (id: string) => {
  const res = await http.get(`https://ruankaokao.com/api/chapter/list`, {
    Knowledge: id,
  });
  if (res.code === 200) return res.data;
  return [];
};

export default (props: any) => {
  const { list1, list2, list3 } = props;
  const nodeList = [
    { type: "low", id: "1" },
    { type: "middle", id: "2" },
    { type: "high", id: "3" },
  ];

  const getTreeDataProvider = (type: string): any => {
    return {
      getChildren: async (element: any) => {
        if (element) {
          if (element.children?.length) {
            return element.children.map((item: any) => ({
              id: item.id,
              label: item.name,
              final: true,
              Knowledge: item.Knowledge
            }));
          }
          if (element.id) {
            const list = await getSubList(element.id);
            return list.map((item: any) => ({
              id: item.id,
              label: item.name,
              children: item.children.map((item: any) => ({...item, Knowledge: element.id })),
            }));
          }
        } else {
          let list;
          switch (type) {
            case "1":
              list = list1;
              break;
            case "2":
              list = list2;
              break;
            case "3":
              list = list3;
              break;
            default:
              list = [];
              break;
          }
          console.log(list, "list890");
          // 如果没有父节点，返回根节点
          return list.map((item: any) => ({
            id: item.id,
            label: item.name,
            top: true,
          }));
        }
      },
      getTreeItem: (element: any) => {
        let collapsibleState: vscode.TreeItemCollapsibleState;
        if (!!element.children?.length || element.top) {
          collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        } else {
          collapsibleState = vscode.TreeItemCollapsibleState.None;
        }

        if (element.final) {
          return {
            id: element.id,
            label: element.label,
            collapsibleState: collapsibleState,
            command: {
              title: "",
              command: "extension.treeItemClick", // 这是你要注册的命令的名称
              arguments: [element], // 这个数组中的元素会被作为参数传递给命令的处理函数
            },
          };
        }
        return {
          id: element.id,
          label: element.label,
          collapsibleState: collapsibleState,
        };
      },
    };
  };

  nodeList.forEach((item: any) => {
    vscode.window.registerTreeDataProvider(
      item.type,
      getTreeDataProvider(item.id)
    );
  });

};
