function flatten(value) {
    // Check if the value is a primitive (not an object or array)
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    // If the value is an array, flatten it
    if (Array.isArray(value)) {
        return flattenArray(value);
    }

    // If the value is an object, flatten it
    return flattenObject(value);
}

function flattenArray(input, flattened = []) {
    // Iterate through each element in the array
    input.forEach(item => {
        if (Array.isArray(item)) {
            // If item is an array, recursively flatten it
            flattenArray(item, flattened);
        } else if (typeof item === 'object' && item !== null) {
            // If item is an object, flatten it and add to flattened array
            flattened.push(flattenObject(item));
        } else {
            // Push primitive values directly into the flattened array
            flattened.push(item);
        }
    });
    
    return flattened;
}

function flattenObject(object) {
    let flattenedObj = {};
    
    // Iterate over key-value pairs in the object
    for (const key in object) {
        const value = object[key];
        const flattenedValue = flatten(value);

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // If value is an object, flatten it and merge it into the result
            Object.assign(flattenedObj, flattenedValue);
        } else {
            // Otherwise, directly assign to the flattened object
            flattenedObj[key] = flattenedValue;
        }
    }

    return flattenedObj;
}

// Sample usage:
console.log(flatten(1)); // 1
console.log(flatten([])); // []
console.log(flatten([1, 2, [3, 4, [], 5]])); // [1, 2, 3, 4, 5]
console.log(flatten({})); // {}
console.log(flatten({ a: null, b: undefined, c: { d: true, e: 4, f: {}, g: { h: 5 }, }})); // { a: null, b: undefined, d: true, e: 4, h: 5 }
console.log(flatten([1, 2, [3], { a: 4, b: { c: 5, d: [6, 7, [8, 9, [10]]] } }])); // [1, 2, 3, { a: 4, c: 5, d: [6, 7, 8, 9, 10] }]
