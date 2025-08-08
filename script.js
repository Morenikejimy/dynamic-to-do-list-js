// 1. Setup Event Listener for Page Load
// This ensures that our JavaScript code runs only after the HTML document has been fully loaded.
document.addEventListener('DOMContentLoaded', function() {

    // 2. Select DOM Elements
    // Get references to the essential HTML elements we will be interacting with.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 3. Create the addTask Function
    // This function contains the logic for creating and adding a new task to the list.
    function addTask() {
        // Retrieve the text from the input field and remove any leading/trailing whitespace.
        const taskText = taskInput.value.trim();

        // Check if the input is empty. If so, alert the user and stop the function.
        if (taskText === "") {
            alert('Please enter a task.');
            return; // Exit the function if there is no task text.
        }

        // 4. Task Creation and Removal Logic
        
        // Create a new list item (li) element.
        const li = document.createElement('li');
        
        // Set the text of the list item. We create a span to hold the text 
        // to properly align it with the remove button using flexbox.
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        // Create the "Remove" button.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn'; // Use className for simplicity, or classList.add()

        // Assign an onclick event to the remove button.
        // When clicked, it will remove its parent `li` element from the `taskList`.
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item.
        li.appendChild(removeBtn);

        // Append the fully-formed list item (with text and button) to the task list.
        taskList.appendChild(li);

        // Clear the task input field for the next entry.
        taskInput.value = "";
    }

    // 5. Attach Event Listeners
    
    // Add a 'click' event listener to the "Add Task" button.
    addButton.addEventListener('click', addTask);

    // Add a 'keypress' event listener to the input field to allow adding tasks with the "Enter" key.
    taskInput.addEventListener('keypress', function(event) {
        // Check if the key pressed was "Enter".
        if (event.key === 'Enter') {
            addTask();
        }
    });
});