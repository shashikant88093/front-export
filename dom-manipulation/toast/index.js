const messageContent = document.getElementById("message-content");
const isCancelable = document.getElementById('cancelable').checked;
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');

const MIN_DURATION = 500;

clearButton.addEventListener('click', clearToasts);
addButton.addEventListener('click', handleToast);

// Show toast
function handleToast() {
    const message = messageContent.value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const toast = createToast(message, isCancelable, type);
    document.getElementById('toasts').prepend(toast);

    setTimeout(() => toast.remove(), getDuration()); // Fixed toast removal with correct method
}

// Clear toasts
function clearToasts() {
    document.getElementById('toasts').innerHTML = '';
}

function getDuration() {
    const duration = parseInt(document.getElementById('duration').value);
    if (isNaN(duration) || duration < MIN_DURATION) {
        return MIN_DURATION;
    }
    return duration;
}

function createToast(message, isCancelable, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', `${type}-toast`); // Combined class addition for brevity

    const paragraph = document.createElement('p');
    paragraph.classList.add('message');
    paragraph.textContent = message.length > 0 ? message : getDefaultMessage(type);
    toast.appendChild(paragraph);

    if (isCancelable) {
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'X';
        cancelButton.addEventListener('click', () => toast.remove());
        toast.appendChild(cancelButton);
    }

    return toast;
}

function getDefaultMessage(type) {
    return type === 'error' ? 'Error.' : 'Success!';
}
