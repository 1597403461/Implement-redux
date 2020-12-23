
const store = createStore(reducer);

const dispatchFunc = store.dispatch;

// 记录 action 时间
// 记录 action 前后 state 的值
store.dispatch = (action) => {
    console.log(new Date());
    console.log('this state', store.getState());
    dispatchFunc(action);
    console.log('next state', store.getState());
}

/** ----------------------------------------------------- */

// 提取logger
const loggerMiddleware = (action) => {
    console.log('this state', store.getState());
    dispatchFunc(action);
    console.log('next state', store.getState());
}

store.dispatch = (action) => {
    console.log(new Date());
    loggerMiddleware(action);
}

/** ------------------------------------------------------ */

// 提取timer
const timerMiddleware = (action) => {
    console.log(new Date());
    loggerMiddleware(action);
}

store.dispatch = timerMiddleware;
// 存在一个问题： timer里嵌套的中间件是固定的，我们需要让其变成动态的，随便哪个中间件都可以

/** ------------------------------------------------------ */


const  timerMiddleware = (next) => (action) => {
    console.log(new Date());
    next(action)
}

store.dispatch = timerMiddleware(loggerMiddleware)

/** ------------------------------------------------------- */

// 修改logger中间件

const loggerMiddleware = (next) => (action) => {
    console.log('this state', store.getState());
    next(action);
    console.log('next state', store.getState());
}

const  timerMiddleware = (next) => (action) => {
    console.log(new Date());
    next(action)
}

store.dispatch = timerMiddleware(loggerMiddleware(dispatchFunc));

// 此时可以将两个中间件独立到单独的文件中去了。

/** ---------------------------------------------------------- */

// 此时有一个问题，中间件中包含了外部变量store，导致无法独立中间件

// 如果把store也作为参数传进去的话，就舒服了

const loggerMiddleware =  (store) => (next) => (action) => {
    console.log('this state', store.getState());
    next(action);
    console.log('next state', store.getState());
}

const  timerMiddleware = (store) => (next) => (action) => {
    console.log(new Date());
    next(action)
}

const timer = timerMiddleware(store);
const logger = loggerMiddleware(store);

store.dispatch = timer(logger(dispatchFunc));





