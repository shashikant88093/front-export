class EventTarget {
    constructor() {
        this.listeners = {}; // Store event listeners
    }

    addEventListener(name, callback) {
        if (!this.listeners[name]) {
            this.listeners[name] = new Set();
        }
        this.listeners[name].add(callback);
    }

    removeEventListener(name, callback) {
        this.listeners[name]?.delete(callback);
    }

    dispatchEvent(name) {
        if (this.listeners[name]) {
            this.listeners[name].forEach(callback => callback());
        }
    }
}

// Example Usage:
let target = new EventTarget();

function handleEvent() {
    console.log("Event triggered!");
}

function handleEvent1(){
    console.log("Event1 triggered")
}

target.addEventListener("click", handleEvent);
target.dispatchEvent("click"); // Logs: "Event triggered!"

target.addEventListener("click", handleEvent1);
target.dispatchEvent("click"); // Logs: "Event triggered!"

// target.removeEventListener("click", handleEvent);
// target.dispatchEvent("click"); // No output since listener was removed
