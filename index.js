{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleDoneTask = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
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

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
        htmlString += `
            <li class="list__item">
                <button class="js-done${task.done ? " js-done--done" : ""}">${task.done ? "✔️" : ""}</button>
                <span class="${task.done ? " list__item--done" : ""}">${task.content}</span>
                <button class="js-remove">🗑️</button>
            </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
};

  init();
}
