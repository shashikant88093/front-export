function flatten(value) {
    if (Array.isArray(value)) {
        // If value is an array, flatten each element
        return value.reduce((acc, item) => {
            return acc.concat(flatten(item)); // Recursively flatten nested arrays
        }, []);
    } else if (typeof value === 'object' && value !== null) {
        // If value is an object, process each key-value pair
        return Object.keys(value).reduce((acc, key) => {
            // Recursively flatten values and exclude empty objects or arrays
            const flatValue = flatten(value[key]);
            if (flatValue !== undefined && flatValue !== null) {
                acc[key] = flatValue;
            }
            return acc;
        }, {});
    } else {
        // For primitive types (non-array, non-object values), return the value
        return value;
    }
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
// Output: { a: null, b: undefined, d: true, e: 4, h: 1 }

let combineObjandArray = [1, 2, [3], {
    a: 4,
    b: {
        c: 5,
        d: [6, 7, [8, 9, [10]]]
    }
}]
// output [1,2,3,{a:4,c:5,d:[6,7,8,9,10]}]
console.log(flatten(combineObjandArray));
