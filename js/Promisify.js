function promisify(callback) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function handleErrorAndValue(err, value) {
                if (err) return reject(err);
                resolve(value);
            }

            try {
                callback.apply(this, [...args, handleErrorAndValue]);
            } catch (err) {
                reject(err);
            }
        });
    };
}

// Example usage:
function asyncFunctionWithCallback(a, b, callback) {
    setTimeout(() => {
        if (a < 0 || b < 0) {
            callback(new Error("Negative numbers are not allowed"), null);
        } else {
            callback(null, a + b);
        }
    }, 1000);
}

const promisifiedFunction = promisify(asyncFunctionWithCallback);

promisifiedFunction(3, 4)
    .then(result => console.log("Result:", result)) // Result: 7
    .catch(error => console.error("Error:", error.message));

promisifiedFunction(-1, 4)
    .then(result => console.log("Result:", result))
    .catch(error => console.error("Error:", error.message)); // Error: Negative numbers are not allowed
