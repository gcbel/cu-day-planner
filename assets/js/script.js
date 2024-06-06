/* VARIABLES */
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
const todoCards = $('#todo-cards');
const inProgressCards = $('#in-progress-cards');
const doneCards = $('#done-cards');
const taskTitleEl = $('#task-title');
const dueDateEl = $('#task-due');
const taskDescrEl = $('#task-descr');

/* FUNCTIONS */
/* Generate a unique task id */
function generateTaskId() {
    const num = JSON.parse(localStorage.getItem("numTasks")) || 0;
    localStorage.setItem("numTasks", num + 1);
    return num + 1;
}

/* Generate a task card */
function createTaskCard(task) {
    // Create and populate card elements
    const card = $('<div class="card project-card draggable" id="test-card"></div>').attr('data-project-id', task.id);
    const cardHead = $('<div class="card-header h3"></div>').text(task.title);
    const cardBody = $('<div class="card-body"></div>');
    const description = $('<p></p>').text(task.descr);
    const dueDate = $('<p></p>').text(task.date);
    const deleteBtn = $('<button class="danger">Delete</button>');
    
    // Assemble card
    description.appendTo(cardBody)
    dueDate.appendTo(cardBody)
    deleteBtn.appendTo(cardBody)
    cardHead.appendTo(card)
    cardBody.appendTo(card)
    todoCards.append(card)
    return card;
}

/* Render task list and make cards draggable */
function renderTaskList() {
    for (const task in taskList) {
        const card = createTaskCard(task);

        // Add task to relevant task list
        if (task.status === todo) {
            todoCards.append(card);
        } else if (task.status === "progress") {
            inProgressCards.append(card);
        } else {
            doneCards.append(card);
        }
    }
}

/* Add a new task */
function handleAddTask(event){
    // Create task object
    const task = {
        id: generateTaskId(),
        title: taskTitleEl.val(),
        date: dueDateEl.val(),
        descr: taskDescrEl.val(),
        status: "todo"
    }

    // Create and display card
    createTaskCard(task);

    // Store in task list
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // Clear inputs
    taskTitleEl.val("");
    dueDateEl.val("");
    taskDescrEl.val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

/* EVENT LISTENERS */
$('#submit-task').on('click', handleAddTask);

$('#task-due').datepicker();
