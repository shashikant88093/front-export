


function describe(testSuiteName, func) {
    console.log(`beginning test suite ${testSuiteName}`)
    try {
        func()
        console.log(`Successfully completed test suite ${testSuiteName}`)

    } catch (error) {
        const { testCaseName, errorMessage } = error
        console.error(
            `failed running test suite ${testSuiteName} on ` +
            `test case ${testCaseName} with error message ${errorMessage}`
        )

    }
}

function it(testCaseName, func) {
    console.log(`beginning test case ${testCaseName}`)

    try {
        func()
        console.log(`Successfully completed test case ${testCaseName}`)
    } catch (errorMessage) {
        throw { testCaseName, errorMessage }

    }

}

function expect(actual) {
    return new ExpectFunction(actual)
}

//  class
class ExpectFunction {

    constructor(actual) {
        this.actual = actual;
        this.stringifiedActual = JSON.stringify(actual)
    }
    toExist() {
        if (this.actual == null) {
            throw `expected value to exist but got ${this.stringifiedActual}`
        }
    }

    toBe(expected) {
        if (this.actual !== expected) {
            throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
                expected
            )}`
        }
    }
    toBeType(type) {
        console.log(this.stringifiedActual,"stringifiedActual")
        if (typeof this.actual !== type) {
            throw ` expected ${this.stringifiedActual
            } to be type ${type} but got ${typeof this.actual}`
        }
    }
}

describe("Testing Framework", () => {
    it("should check if a value exists", () => {
        expect(5).toExist(); // Passes
    });

    it("should check if two values are equal", () => {
        expect(5).toBe(5); // Passes
    });

    it("should fail if types do not match", () => {
        expect(1).toBeType("boolean"); // Fails
    });
});

// function

// function ExpectFunction(actual) {
//     this.actual = actual
//     this.stringifiedActual = JSON.stringify(actual)
// }

// ExpectFunction.prototype.toExist = function () {
//     if (this.actual == null) {
//         throw `expected value to exist but got ${this.stringifiedActual}`
//     }

//     ExpectFunction.prototype.toBe = function (expected) {
//         if (this.actual !== expected) {
//             throw ` expected ${this.stringifiedActual} to be ${JSON.stringify(expected)}`

//         }

//     }

//     ExpectFunction.prototype.toBeType(type){
//         if (typeof this.actual !== type) {
//             throw ` expected ${this.stringifiedActual
//             } to be type ${type} but got ${typeof this.actual}`
//         }
//     }
// }


// solution front-end export


function describe(testSuiteName, func) {
    console.log(`beginning test suite ${testSuiteName}`);
    try {
        func();
        console.log(`successfully completed test suite ${testSuiteName}`);
    } catch (error) {
        const { testCaseName, errorMessage } = error;
        console.error(
            `failed running test suite ${testSuiteName} on test case ${testCaseName} with error message ${errorMessage}`
        );
    }
}

function it(testCaseName, func) {
    console.log(`beginning test case ${testCaseName}`);
    try {
        func();
        console.log(`successfully completed test case ${testCaseName}`);
    } catch (errorMessage) {
        throw { testCaseName, errorMessage };
    }
}

function expect(actual) {
    return new ExpectFunction(actual);
}

class ExpectFunction {
    constructor(actual) {
        this.actual = actual;
        this.stringifiedActual = JSON.stringify(actual);
    }

    toExist() {
        if (this.actual == null) {
            throw `expected value to exist but got ${this.stringifiedActual}`;
        }
    }

    toBe(expected) {
        if (this.actual !== expected) {
            throw `expected ${this.stringifiedActual} to be ${JSON.stringify(expected)}`;
        }
    }

    toBeType(type) {
        if (typeof this.actual !== type) {
            throw `expected ${this.stringifiedActual} to be of type ${type} but got ${typeof this.actual}`;
        }
    }
}





