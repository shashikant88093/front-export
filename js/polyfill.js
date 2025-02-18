// call | apply | bind
// global function

const obj = { num: 0 }
function logNums(x, y) {
    console.log(this.num, x, y)
}

// call

Function.prototype.myCall = function (thisContext={}, ...args) {

    if(typeof this !== 'function'){
        throw new Error(This + "It is not a function")
    }

    thisContext.fn = this
    thisContext.fn(...args)





}

logNums.myCall(obj, 1,2)


//  apply

Function.prototype.myApply = function(thisContext={},args=[]){
    if(typeof this !== 'function'){
        throw new Error(this + "It is not a function")
    }

    if(!Array.isArray(args)){
        throw new TypeError("It is not an array")
    }

    thisContext.fn = this;
    thisContext.fn(...args);
}

logNums.myApply(obj,[1,3])


//  Bind 

Function.prototype.myBind = function(thisContext={}, ...args){
    if(typeof this !== 'function'){
        throw new Error(this + "It is not function")
    }

    thisContext.fn = this

    return function(...newArgs){
        return thisContext.fn(...args,...newArgs)
    }
}

const polybind = logNums.myBind(obj)

console.log(polybind(2,5))


// pass all test case this binding

// Function.prototype.myCall = function(thisContext,...args){
//     const fxname = Symbol()
//     thisContext[fxname] = this

//     const returnValue = thisContext[fxname](...args)
//     delete thisContext[fxname]
//     return returnValue
// }


// Function.prototype.myApply = function(thisContext,args=[]){
//     return this.myCall(thisContext, ...args)
// }

// Function.prototype.myBind = function(thisContext, ...args){
//     let target = this
//     return function(...optional){
//         return target.myCall(thisContext, ...args, ...optional)
//     }
// }


