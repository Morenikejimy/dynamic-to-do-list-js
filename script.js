// Wait for the DOM to be fully loaded before running the script.
document.addEventListener('DOMContentLoaded', () => {

    // Select the essential DOM elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Loads tasks from Local Storage and displays them on the page.
     * This function is called once when the page loads.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTaskToDOM(taskText));
    }

    /**
     * Adds a task to the DOM (the visual list on the page).
     * It also sets up the "Remove" button's functionality for that task.
     * @param {string} taskText - The text of the task to add.
     */
    function addTaskToDOM(taskText) {
        // Create the list item element.
        const li = document.createElement('li');

        // To align with the provided CSS, we'll put the text in a span.
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        // Create the "Remove" button.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Add the logic for removing the task.
        removeBtn.onclick = function() {
            // Remove from the DOM.
            taskList.removeChild(li);

            // Remove from Local Storage.
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * Adds a new task based on user input and saves it to Local Storage.
     */
    function addTask() {
        // Get and trim the input value.
        const taskText = taskInput.value.trim();

        // Validate that the input is not empty.
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Add the task to the visual list on the page.
        addTaskToDOM(taskText);

        // Save the new task to Local Storage.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        // Clear the input field for the next task.
        taskInput.value = "";
    }

    /**
     * Removes a specific task from Local Storage.
     * @param {string} taskText - The text of the task to be removed.
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Filter out the task that matches the text to be removed.
        storedTasks = storedTasks.filter(task => task !== taskText);
        // Save the updated array back to Local Storage.
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Attach event listeners to the "Add Task" button and the input field.
    addButton.addEventListener('click', addTask);
   
    taskInput.addEventListener('keypress', function(event) {
       
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load of tasks from Local Storage when the page is ready.
    loadTasks();
});