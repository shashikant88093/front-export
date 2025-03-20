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
        listOfTask.splice(index, 1);
        renderList();
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

        // Append task text properly
        li.appendChild(document.createTextNode(task));

        // Create delete button
        const span = document.createElement("span");
        span.textContent = " X ";
        span.classList.add("delete-button");
        span.dataset.index = index;

        li.appendChild(span);
        ul.appendChild(li);
    });

    // 🔥 Debugging Assertion
    console.assert(ul.children.length === listOfTask.length, `Expected ${listOfTask.length}, but got ${ul.children.length}`);
}

function handleChange(e) {
    task = e.target.value;
    toggleAddButton();
}
