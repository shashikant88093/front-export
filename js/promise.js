const STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

class MyPromise {
    #state = STATE.PENDING;
    #value = null;
    #fulfilledCallbacks = [];
    #rejectedCallbacks = [];

    constructor(executorFun) {
        try {
            executorFun(
                value => this.#resolve(value),
                reason => this.#reject(reason)
            );
        } catch (error) {
            this.#reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const fulfilledCallback = () => {
                if (!onFulfilled) return resolve(this.#value);
                queueMicrotask(() => {
                    try {
                        const value = onFulfilled(this.#value);
                        resolve(value);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            const rejectedCallback = () => {
                if (!onRejected) return reject(this.#value);
                queueMicrotask(() => {
                    try {
                        const value = onRejected(this.#value);
                        resolve(value);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            switch (this.#state) {
                case STATE.PENDING:
                    this.#fulfilledCallbacks.push(fulfilledCallback);
                    this.#rejectedCallbacks.push(rejectedCallback);
                    break;
                case STATE.FULFILLED:
                    fulfilledCallback();
                    break;
                case STATE.REJECTED:
                    rejectedCallback();
                    break;
                default:
                    throw new Error('Unexpected promise state');
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    #resolve(value) {
        if (this.#state !== STATE.PENDING) return;
        this.#value = value;
        this.#state = STATE.FULFILLED;
        this.#fulfilledCallbacks.forEach(callback => callback());
        this.#fulfilledCallbacks = [];
        this.#rejectedCallbacks = [];
    }

    #reject(reason) {
        if (this.#state !== STATE.PENDING) return;
        this.#value = reason;
        this.#state = STATE.REJECTED;
        this.#rejectedCallbacks.forEach(callback => callback());
        this.#fulfilledCallbacks = [];
        this.#rejectedCallbacks = [];
    }

    get state() {
        return this.#state;
    }

    get value() {
        return this.#value;
    }
}



new MyPromise((res,rej)=>{
    res(10)
})