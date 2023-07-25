//element references
const addTaskForm = document.querySelector('.add');
const taskList = document.querySelector('.tasks');
const searchTaskInput = document.querySelector('.search');

//displayng search input upon task-length >= 5;
const checkTaskListLength = () => {
    if (JSON.parse(localStorage.getItem('tasks')).length >= 5) {
        searchTaskInput.classList.remove('hide-search');
    }
    if (JSON.parse(localStorage.getItem('tasks')).length < 5) {
        searchTaskInput.classList.add('hide-search');
    }
}

//displaying tasks from local storage on the list
const displayTasksOnDOMLoading = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => generateTaskTemplate(task));
    checkTaskListLength();
}

//setting tasks to and getting from local storage
const setTasksToStorage = (taskTitle) => {
    const tasks = getTasksFromStorage();
    tasks.push(taskTitle);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getTasksFromStorage = () => {
    let tasks;
    if (!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

//generating new-task template
const generateTaskTemplate = (taskTitle) => {
    const newTask = `
            <li class=" text-light list-group-item d-flex justify-content-between align-items-center">
            <input type="checkbox" class="checkbox">
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
        setTasksToStorage(taskTitle);
        addTaskForm.reset();
    }
    checkTaskListLength();
}

//deleting task from list
const deletTaskFromStorage = (taskTitle) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTaskLIst = tasks.filter(task => task !== taskTitle);
    localStorage.setItem('tasks', JSON.stringify(updatedTaskLIst));
    checkTaskListLength();
}
const deleteTaskFromList = (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
        const taskTitle = event.target.parentElement.innerText.trim();
        deletTaskFromStorage(taskTitle);
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
document.addEventListener('DOMContentLoaded', displayTasksOnDOMLoading);