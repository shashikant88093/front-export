
function throttle(callback, delay) {

    let timerID;
    let lastCalledTime = 0;

    const throttledFunction = function (...args) {
        const currentTime = Date.now()
        const timeSinceLastCall = currentTime - lastCalledTime
        const delayRemaining = delay - timeSinceLastCall

        if (delayRemaining <= 0) {
            lastCalledTime = currentTime;
            callback.apply(this, args);
        } else {
            clearTimeout(timerID)
           timerID = setTimeout(() => {
                lastCalledTime = Date.now()
                callback.apply(this, args)
            }, delayRemaining)
        }
    }
    throttledFunction.cancel = function(){
        clearInterval(timerID)
    }
return throttledFunction

}

function someCallBack(){
    console.log("I am throttle")
}
const object ={}
object.throttle = throttle(someCallBack,3000)
object.throttle()
