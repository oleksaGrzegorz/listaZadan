{
  const tasks = [
    {
      content: "zadanie 1",
      done: false,
    },
    {
      content: "zadanie 2",
      done: true,
    },
  ];
  const init = () => {
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>${task.content}</li>
        `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  init();
}