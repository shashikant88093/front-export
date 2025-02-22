function sleep(time, value, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfill") {
                return resolve(value);
            } else {
                return reject(new Error(value));
            }
        }, time);
    });
}

const p1 = sleep(500, "one", "fulfill"); // Corrected typo "fullfill" to "fulfill"
const p2 = sleep(100, "two", "fulfill");

// myRace => t returns a single promise that resolves or rejects as soon as one of the promises in the provided iterable resolves or rejects.
// Promise.race([p1, p2]).then((value) => {
//     console.log(value); // This should log "two" because p2 resolves first
// }).catch((error) => {
//     console.error(error);
// });

//   ===================== polyfill of race ==========================
let promises = [p1, p2]
Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise.then(resolve).catch(reject)

        });
    })
}







// myAny => only resolves with the first successful promise. If all promises fail, it rejects with an AggregateError.

Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
        let countRejection = 0
        promises.forEach((promise, i) => {
            promise.then(resolve).catch((_) => {
                countRejection++
                if (countRejection === promises.length) {
                    reject("all promises rejected")
                }
            })

        })
    })
}


// myAll => It returns a single promise that resolves only when all the promises in the provided iterable have resolved. If any of the promises reject, Promise.all() will immediately reject with the reason of the first rejected promise.

Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        let countRejection = 0
        const results = []
        promises.forEach((promise) => {
            promise.then(value => {
                results[i] = value
                countRejection++
                if (countRejection === promises.length) {
                    resolve(results)
                }
            }).catch(reject)
        })
    })
}
// myAllSettled

Promise.myAllSettled = function (promises) {
    return new Promise((resolve) => {
        let countStelled = 0
        let results = []
        promises.forEach((promise, i) => {
            promise.then(value => {
                results[i] = {
                    status: "fulfilled",
                    value
                }
            }).catch(error => {
                results[i] = { status: 'rejected', error }

            }).finally(() => {
                countStelled++
                if (countStelled === promises.length) {
                    resolve(results)
                }
            })
        })
    })

}