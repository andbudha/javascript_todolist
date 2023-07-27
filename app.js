//references
const inputField = document.querySelector('.add');
const taskList = document.querySelector('.tasks');


//generating new-task template
const generateTaskTemplate = (inputTaskTitle) => {
    const newTask = `
                     <li class="task">
                        <i class="far fa-check-circle fa-circle"></i>
                        <p class="task_title">${inputTaskTitle}</p>
                        <i class="fas fa-trash-alt delete"></i>
                    </li>
    `;
    taskList.innerHTML += newTask;
}

//adding new task
const addNewTask = (event) => {
    event.preventDefault();
    const inputTaskTitle = inputField.add.value;
    if (inputTaskTitle.length) {
        generateTaskTemplate(inputTaskTitle);
        inputField.reset();
    } else {
        alert('Please, add a new task!');
    }

    saveData();
}

//task deleting
const deleteTask = (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
    }
    saveData();
}

//marking tasks as completed
const markCompleted = (event) => {
    if (event.target.classList.contains('fa-check-circle')) {
        event.target.classList.toggle('fa-circle');
    }
    saveData();
}

//saving to local storage
const saveData = () => {
    localStorage.setItem('data', taskList.innerHTML);
}

//displaying the list from the local storage
const displayList = () => {
    taskList.innerHTML = localStorage.getItem('data');
}

displayList();

//event listeners
inputField.addEventListener('submit', addNewTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', markCompleted);


