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
    const card = $('<div class="card project-card draggable" id="task-card"></div>').attr('task-id', task.id);
    const cardHead = $('<div class="card-header h3"></div>').text(task.title);
    const cardBody = $('<div class="card-body"></div>');
    const description = $('<p></p>').text(task.descr);
    const dueDate = $('<p></p>').text(task.date);
    const deleteBtn = $('<button class="danger">Delete</button>');
    
    // Assemble card
    cardBody.append(description)
    cardBody.append(dueDate)
    cardBody.append(deleteBtn)
    card.append(cardHead)
    card.append(cardBody)
    todoCards.append(card)
    return card;
}

/* Render task list and make cards draggable */
function renderTaskList() {
    for (const index in taskList) {
        const task = taskList[index];
        const card = createTaskCard(task);

        // Add task to relevant task list
        if (task.status == "todo") {
            todoCards.append(card);
        } else if (task.status == "progress") {
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

/* Update status of card when dropping into a new lane */
function handleDrop(event, ui) {
    // Get new location of card
    const list = $(this).attr('id');
    let newStatus = "";
    if (list == "to-do") {
        newStatus = "todo";
    } else if (list == "in-progress") {
        newStatus = "progress";
    } else {
        newStatus = "done";
    }

    // Update status of card
    const targetId = ui.draggable.attr('task-id');
    for (const index in taskList) {
        const task = taskList[index]
        if (targetId == task.id) {
            taskList[targetIndex].status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(taskList));
            break;
        }
    }
    $('.draggable').draggable();
}

/* When the page loads, render the task list, add event listeners, make lanes */
/* droppable, and make the due date field a date picker */
$(document).ready(function () {
    renderTaskList()
    $('#submit-task').on('click', handleAddTask);
    $(".droppable").droppable({drop: handleDrop});
    $('#task-due').datepicker();
    $(".sortable").sortable();
    $('.draggable').draggable();
});