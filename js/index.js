{
  let tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
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

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
            <li class="list__item">
                <button class="doneButton js-done${
                  task.done ? " doneButton--done" : ""
                }">
                  ${task.done ? "✓" : ""}
                </button>
                <span class="list__itemContent ${
                  task.done ? " list__item--done" : ""
                }">
                  ${task.content}
                </span>
                <button class="removeButton js-remove">🗑️</button>
            </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonsContainer = document.querySelector(".section_buttons");
    buttonsContainer.innerHTML = `
      <button class="button js-xxx">xxx</button>
      <button class="button js-yyy">yyy</button>
    `;
  
    const xxxButton = document.querySelector(".js-xxx");
    const yyyButton = document.querySelector(".js-yyy");
  
    xxxButton.addEventListener("click", () => {
      console.log("Przycisk xxx został kliknięty");
    });
  
    yyyButton.addEventListener("click", () => {
      console.log("Przycisk yyy został kliknięty");
    });
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
