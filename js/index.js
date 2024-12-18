let objValue = {
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


// get all objvalue key  nested also

function concatKeysAndValues(obj) {
    const result = {}; // Output object

    function traverse(current) {
        for (const key in current) {
            const value = current[key];
            // Only include properties that are not empty objects
            if (value && typeof value === "object" && Object.keys(value).length > 0) {
                traverse(value); // Recursively process nested objects
            } else {
                // Include the property in the result
                result[key] = value;
            }
        }
    }

    traverse(obj);
    return result;
}

    console.log(concatKeysAndValues(objValue))