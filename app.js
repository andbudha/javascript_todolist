//element references
const addTaskForm = document.querySelector('.add');
const taskList = document.querySelector('.tasks');

//generating new-task template
const generateTaskTemplate = (taskTitle) => {
    const newTask = `
            <li class=" text-light list-group-item d-flex justify-content-between align-items-center">
                <span>${taskTitle}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
    `;
    taskList.innerHTML += newTask;
}

//adding new task
const addNewTask = (event) => {
    event.preventDefault();
    const taskTitle = addTaskForm.add.value;
    if (taskTitle.length) {
        generateTaskTemplate(taskTitle);
        addTaskForm.reset();
    }
}

//event listeners
addTaskForm.addEventListener('submit', addNewTask);