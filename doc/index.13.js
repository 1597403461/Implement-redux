// 中间件的最终使用

const createStore = (reducer, initialState) => {
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

const store = createStore(reducer);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})

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


const thunk = thunkMiddleware(store);
const timer = timerMiddleware(store);
const logger = loggerMiddleware(store);

store.dispatch = thunk(timer(logger(store.dispatch)));

const updateName = (dispatch, getState) => {
    console.log('start');
    dispatch({ type: 'SETNAME', payload: 'danny' });
    console.log('end')
}

store.dispatch(updateName);

store.dispatch({ type: 'INCREMENT' })

// 其实除了中间件，其他内容（112-116行）都可以封装起来的。（改写store）
