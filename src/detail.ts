export const getHtml = ({title, questionList}: {title: string, questionList: any}) => {
    const questionListStr = JSON.stringify(questionList, (key, value) =>
        typeof value === 'string'
          ? value.replace(/[\u0000-\u001f]/g, '')
          : value
      );
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <style>
        .question-title {
            font-size: 16px;
        }
        .question-item-container {
            margin-bottom: 18px;
        }
        .question-item {
            margin-left: 28px;
            margin-top: 12px;
        }
        .operation {
            width: 100px;
            height: 30px;
            background-color: #007bff;
            border-radius: 4px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            margin-top: 20px;
        }
        .answer-detail {
            margin: 10px 0;
        }
    </style>
    <body>
        <H1>${title}</H1>
        <div id="list-container"></div>
        <script>
      const element = document.querySelector("#list-container");
      const questionList = ${questionListStr};
      function getAnswer(index) {
        const answer = document.querySelector(\`.answer-\${index}\`)
        console.log(answer, 'answer')
        if (answer.style.display === "none") {
            answer.style.display = "block";
        }else {
            answer.style.display = "none";
        }
      }
      for (let i = 0; i < questionList.length; i++) {
        let newElement = document.createElement("div");
        newElement.className = "question-item-container";
        newElement.innerHTML = \`
            <div class="question-title">第\${i+1}题: \${questionList[i].title}</div>
            <div class="question-item">\${questionList[i].itemList[0].chooseValue}: \${questionList[i].itemList[0].content}</div>
            <div class="question-item">\${questionList[i].itemList[1].chooseValue}: \${questionList[i].itemList[1].content}</div>
            <div class="question-item">\${questionList[i].itemList[2].chooseValue}: \${questionList[i].itemList[2].content}</div>
            <div class="question-item">\${questionList[i].itemList[3].chooseValue}: \${questionList[i].itemList[3].content}</div>
            <div class="operation" onClick={getAnswer(\${i})}>
                查看答案和解析
            </div>
            <div class="answer-container answer-\${i}" style="display: none;">
                <div class="answer-detail">正确答案是: \${questionList[i].answer}</div>
                <div class="answer-parsing">解析: \${questionList[i].analyze}</div>
            </div>
            \`
        element.appendChild(newElement)
      }
    </script>
    </body>
    </html>`
}