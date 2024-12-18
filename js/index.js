{
  let tasks = [];

  
  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent },];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1),
    ];
    render();
};

  const toggleDoneTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
          ...tasks[taskIndex],
          done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
  ];
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleDoneTask(taskIndex);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();

    if (newTaskContent === "") {
      newTaskInput.focus();
      return;
    }

    addNewTask(newTaskContent);
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
                <button class="doneButton js-done${task.done ? " doneButton--done" : ""}">
                  ${task.done ? "✓" : ""}
                </button>
                <span class="${task.done ? " list__item--done" : ""}">
                  ${task.content}
                </span>
                <button class="removeButton js-remove">🗑️</button>
            </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
