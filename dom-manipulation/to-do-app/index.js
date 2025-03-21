let task = "";
let listOfTask = [];

const input = document.getElementById("todo-input");
const add = document.getElementById("add-button");
const ul = document.getElementById("todo-list");

function toggleAddButton() {
    return (add.disabled = input.value.trim().length === 0);
}

function clearInput() {
    input.value = "";
    task = "";
    toggleAddButton(); // Ensure button is disabled after clearing
}

input.addEventListener("input", handleChange);
add.addEventListener("click", handleAdd);
ul.addEventListener("click", handleDelete);

function handleDelete(event) {
    if (event.target.classList.contains("delete-button")) {
        const index = parseInt(event.target.dataset.index, 10);
        if (!isNaN(index)) {
            listOfTask.splice(index, 1);
            renderList();
        }
    }
}

function handleAdd() {
    if (!task.trim()) return;

    listOfTask.push(task.trim());
    renderList();
    clearInput();
}

function renderList() {
    ul.innerHTML = ""; // Clear and re-render

    listOfTask.forEach((task, index) => {
        const li = document.createElement("li");

        // Create <h2> for the task text
        const h2 = document.createElement("h2");
        h2.textContent = task;

        li.appendChild(h2); // Add task inside <h2>

        // Create delete button as <button> instead of <span>
        const button = document.createElement("button");
        button.textContent = "X"; // Delete text
        button.classList.add("delete-button");
        button.dataset.index = index;

        li.appendChild(button); // Append delete button
        ul.appendChild(li);
    });
}

function handleChange(e) {
    task = e.target.value;
    toggleAddButton();
}
