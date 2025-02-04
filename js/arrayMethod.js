
let arr = [1,2,3,4,5,6,7,8,9,6]

// arr.filter((arr)=>{
//     if(arr>4){
//         console.log(arr)
//     }
// })
// ============================ filter ===================================== 

Array.prototype.myFilter = function(callback){
    // console.log(this)
    let res =[]
    for(let i=0;i<this.length;i++){
        // console.log(this[i],"this[i]")
        
        if(callback(this[i],i,this) === true){
            res.push(this[i])
        }
        // callback(this[i],i)
    }
    return res
}

const filter = arr.myFilter((arr,i)=>{
    // console.log(arr,i,"arr ,i")
    return arr > 4

})

console.log(filter)


//  ============================== map ========================================

Array.prototype.myMap = function(callback){
    let res =[]
    for(let i =0;i<this.length;i++){
       res.push(callback(this[i],i,this))
    }
    return res
}

const map = arr.myMap((arr)=>{
    return arr * 2
})

console.log(map)



//  ================================ reduce ===================================


// let sum = arr.reduce((acc,num)=>  acc + num,0)

// console.log(sum)

Array.prototype.myReduce = function(callback,initialValue){
    let accumulator = initialValue !== this.undefined ? initialValue : this[0]
    let startIndex = initialValue !== this.undefined ? 0 : 1
    
    for(let i = startIndex;i<this.length;i++){
        accumulator = callback(accumulator, this[i],i,this)
    }

    return accumulator

}

let sum = arr.myReduce((acc,num)=> acc + num)

console.log(sum)



