const STATE = {
    PENDING: 'pending',
    FULLFILLED: 'fullfilled',
    REJECTED: 'rejeacted'

}

class MyPromise {
    #state = STATE.PENDING
    #value = null
    #fullfilledCallbacks = []
    #rejectedCallbacks = []
    constructor(executorFun) {
        try {
            executorFun(
                value => this.#resolve(value),
                value => this.#reject(value),
            );
        } catch (error) {
            this.#reject(error)
        }


    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const fullfilledCallback = () => {
                if (!onFulfilled) return resolve(this.#value)
                queueMicrotask(() => {
                    try {
                        const value = onFulfilled(this.#value)
                        resolve(value)
                    } catch (error) {

                        reject(error)

                    }
                })
            }

            const rejectedCallback = () => {
                if (!onRejected) return reject(this.#value)
                queueMicrotask(() => {
                    try {
                       const value = onRejected(this.#value)
                       resolve(value)
                    } catch (err) {
                      reject(err)
                    }
                })
            }
            switch(this.#state){
                case STATE.PENDING:
                    this.#fullfilledCallbacks.push(fullfilledCallback);
                    this.#rejectedCallbacks.push(rejectedCallback)
                    break;
                case STATE.FULLFILLED:
                    fullfilledCallback();
                    break;
                case STATE.REJECTED:
                    rejectedCallback();
                    break;
                default:
                    throw new Error("Unexpected promise state")
            }
        })
    }
    catch(onRejected){
        return this.then(null,onRejected)
    }

    get state(){
        return this.#value
    }

    get value(){
        return this.#value
    }

    #resolve(value){
        this.#value = value;
        this.#state=STATE.FULLFILLED;
        this.#fullfilledCallbacks.forEach(callback => callback())
    }
    #reject(value){
        this.#value = value;
        this.#state = STATE.REJECTED;
        this.#rejectedCallbacks.forEach(callback=> callback)
    }
}


new MyPromise((res,rej)=>{
    res(10)
})