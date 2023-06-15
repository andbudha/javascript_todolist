//element references
const addTaskForm = document.querySelector('.add');
const taskList = document.querySelector('.tasks');
const searchTaskInput = document.querySelector('.search');

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

//deleting task from list
const deleteTaskFromList = (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
}

//filtering tasks
const filterTasks = (searchInputValue) => {
    Array.from(taskList.children)
        .filter(task => !task.innerText.toLowerCase().includes(searchInputValue))
        .forEach(task => task.classList.add('filtered'));
    Array.from(taskList.children)
        .filter(task => task.innerText.toLowerCase().includes(searchInputValue))
        .forEach(task => task.classList.remove('filtered'));
}

const catchSearchInputValue = () => {
    const searchInputValue = searchTaskInput.search.value.toLowerCase();
    filterTasks(searchInputValue);
}
//event listeners
addTaskForm.addEventListener('submit', addNewTask);
taskList.addEventListener('click', deleteTaskFromList);
searchTaskInput.addEventListener('keyup', catchSearchInputValue);