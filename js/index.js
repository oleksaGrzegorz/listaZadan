let tasks = [];
let hideDoneTasks = false;

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

const toggleHideDoneTasks = () => {
  hideDoneTasks = !hideDoneTasks;
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
    const isHidden = task.done && hideDoneTasks;

    htmlString += `
            <li class="list__item ${isHidden ? "tasksItemHidden" : ""}">
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

const areAllTasksDone = () => {
  return tasks.every(({ done }) => done);
};

const renderButtons = () => {
  const buttonsContainer = document.querySelector(".section_buttons");
  if (tasks.length === 0) {
    buttonsContainer.innerHTML = "";
    return;
  }

  buttonsContainer.innerHTML = `
        <button class="section__button--secondary js-hideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button--secondary js-markAllTasksDone"
            ${areAllTasksDone() ? "disabled" : ""}
        >Ukończ wszystkie</button>
    `;

  const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
  const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");
  hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
  markAllTasksDoneButton.addEventListener("click", () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
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
