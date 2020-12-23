// 改写store的函数是applyMiddleware，是不是很熟悉

// applyMiddleware 实际上改写的是createStore

// 期待用法: const store = createStore(reducer, initState, applyMiddleware(thunkMiddleware, timeMiddleware, loggerMiddleware));

const compose = (...funcs) => {
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const applyMiddleware = (...args) => (oldCreateStore) => (reducer, initialState) => {
    // args = [thunkMiddleware, timeMiddleware, loggerMiddleware]
    const store = oldCreateStore(reducer, initialState);
    const chain = args.map(item => item(store));
    // chain = [thunk, timer, logger]
    let next = store.dispatch;
    // compose是redux将[A, B, C] 转换成 A(B(C(next)))的内置方法
    next = compose(...chain)(next);
    store.dispatch = next;
    return store;
}


const createStore = (reducer, initialState, rewriteCreateStoreFunc) => {

    // 为了解决有时候我们创建 store 的时候不传 initState 的情况
    if (typeof initialState === 'function') {
        rewriteCreateStoreFunc = initialState;
        initialState = undefined;
    }

    // 有中间件时，重写 createStore
    // 中间件其实是重写 dispatch 的过程,增强 dispatch 功能
    if (rewriteCreateStoreFunc) {
        const newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer, initialState);
    }
    let state = initialState;

    const listenters = [];

    function subscribe(listener) {
        listenters.push(listener);
    }

    function dispatch(action) {
        state = reducer(state, action);
        listenters.forEach(callback => { callback() })
    }

    const getState = () => state;

    dispatch({ type: Symbol() });

    return {
        subscribe,
        dispatch,
        getState
    }
}

function combineReducers(reducers) {

    /* reducerKeys = ['counter', 'info']*/
    const reducerKeys = Object.keys(reducers)

    /*返回合并后的新的reducer函数*/
    return function combination(state = {}, action) {
        /*生成的新的state*/
        const nextState = {}

        /*遍历执行所有的reducers，整合成为一个新的state*/
        for (let i = 0; i < reducerKeys.length; i++) {
            const key = reducerKeys[i]
            const reducer = reducers[key]
            /*之前的 key 的 state*/
            const previousStateForKey = state[key]
            /*执行 分 reducer，获得新的state*/
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
        }
        return nextState;
    }
}

/** ---------------------------------------------------------- */


/*agerReducer, 一个子reducer*/
/*注意：agerReducer 接收的 state 是 state.counter*/
function agerReducer(age = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return age + 1
        default:
            return age;
    }
}


/*nameReducer，一个子reducer*/
/*注意：nameReducer 接收的 state 是 state.name*/
function nameReducer(state = '', action) {
    switch (action.type) {
        case 'SETNAME':
            return action.payload;
        default:
            return state;
    }
}

const reducer = combineReducers({
    age: agerReducer,
    name: nameReducer
});

const loggerMiddleware = (store) => (next) => (action) => {
    console.log('this state', store.getState());
    next(action);
    console.log('next state', store.getState());
}

const timerMiddleware = (store) => (next) => (action) => {
    console.log(new Date());
    next(action)
}

// thunk中间件
const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        const { dispatch, getState } = store;
        return action(dispatch, getState);
    }

    return next(action);
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, timerMiddleware, loggerMiddleware));

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})

const updateName = (dispatch, getState) => {
    console.log('start');
    dispatch({ type: 'SETNAME', payload: 'danny' });
    console.log('end')
}

store.dispatch(updateName);

store.dispatch({ type: 'INCREMENT' })
