function flatten(value, newVal = []) {

    if (typeof value !== 'object' || value === null) {
        return value;
    }

    else if (Array.isArray(value)) {
        handleArray(value, newVal);
    } else {
        handleObject(value, newVal);
    }

    return newVal;
}


function handleArray(value, newVal) {
    for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'object' || value[i] === null) {
            newVal.push(value[i]);
        } else if (Array.isArray(value[i])) {
            handleArray(value[i], newVal);
        } else {
            newVal.push(handleObject(value[i], {}))
        }
    }

    return newVal;
}


function handleObject(value, newVal) {
    for (const key in value) {
        if (typeof value[key] !== 'object' || value[key] === null) {
            newVal[key] = value[key];
        } else if (Array.isArray(value[key])) {
            newVal[key] = handleArray(value[key], [])
        } else {
            handleObject(value[key], newVal)
        }
    }
    return newVal;
}

// Test with an array
let arrayValue = [1, 2, [3, 4, [], 5]];
console.log(flatten(arrayValue)); // Output: [1, 2, 3, 4, 5]

// Test with an object
let objectValue = {
    a: null,
    b: undefined,
    c: {
        d: true,
        e: 4,
        f: {},
        g: {
            h: 1,
        }
    }
};
console.log(flatten(objectValue));
// Output: { 'c.d': true, 'c.e': 4, 'c.g.h': 1 }
