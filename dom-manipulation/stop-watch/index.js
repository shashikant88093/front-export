// max 59:59:999  mintues:seconds:milliseconds
let INTERVAL_MS = 1000 / 60
let timerId;
let startTimePointer = 0;
let millisecondsLastTimePointer = 0


const start = document.getElementById("start-button");
const stop = document.getElementById("stop-button");
const reset = document.getElementById("reset-button");
const timer = document.getElementById("timer");

const formatNumber = (numer, desirelength) => {
    let stringTime = String(numer);
    if (stringTime.length > desirelength) {
        return stringTime.slice(0, desirelength);
    }
    return stringTime.padStart(desirelength, "0");
};
const updateTimer = () => {
    // let milliseconds = Date.now() - startTimePointer + millisecondsLastTimePointer;
    let milliseconds = performance.now() - startTimePointer + millisecondsLastTimePointer;
    let seconds = milliseconds / 1000;
    let mintues = seconds / 60;

    let milliText = formatNumber(Math.floor(milliseconds) % 1000, 3);
    let secondText = formatNumber(Math.floor(seconds) % 60, 2);
    let mintueText = formatNumber(Math.floor(mintues), 2);

    timer.textContent = `${mintueText}:${secondText}:${milliText}`;
    // timerId = requestAnimationFrame(updateTimer)
};
const handleStart = () => {
    stop.disabled = false;
    reset.disabled = false;
    start.disabled = true;

    // startTimePointer = Date.now();
    startTimePointer = performance.now();

    // timerId = requestAnimationFrame(updateTimer);
    timerId = setInterval(updateTimer,INTERVAL_MS);
};
const handleStop = () => {
    stop.disabled = false;
    reset.disabled = false;
    start.disabled = false;
    // millisecondsLastTimePointer += Date.now - startTimePointer
    millisecondsLastTimePointer += performance.now() - startTimePointer
    // cancelAnimationFrame(timerId);
    clearInterval(timerId);
};
const handleReset = () => {
    stop.disabled = true;
    reset.disabled = true;
    start.disabled = false;
    clearInterval(timerId)
    timer.textContent = "00:00:000";
    millisecondsLastTimePointer = 0
};

start.addEventListener("click", handleStart);
stop.addEventListener("click", handleStop);
reset.addEventListener("click", handleReset);
