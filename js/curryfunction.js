// curry function

// plain function

function sum(a, b, c) {
    return a + b + c
}

// console.log(sum(1,2,3))



function curry(callback) {
    // console.log(this,"this")
    const curriedCallback=(...args)=> {
        if (args.length === 0) {
            return callback()
        }
        return  (...args2)=>{
            if (args2.length == 0) {
                return callback.call(this, ...args)
            }
            return curriedCallback.apply(this, [...args, ...args2])
        }

    }
    return curriedCallback

}

let add = curry(sum(1, 2, 3, 4, 8))


console.log(add())