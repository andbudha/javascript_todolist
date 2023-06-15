//element references
const addTaskForm = document.querySelector('.add');
const taskList = document.querySelector('.tasks');
const searchTaskInput = document.querySelector('.search');

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