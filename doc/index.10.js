// 中间件
// 中间件就是对dispatch的拓展，增强dispatch的功能

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

const dispatchFunc = store.dispatch;

// 记录 action 时间
// 记录 action 前后 state 的值
store.dispatch = (action) => {
    console.log('this state', store.getState());
    console.log(new Date());
    dispatchFunc(action);
    console.log('next state', store.getState());
}

store.dispatch({ type: 'SETNAME', payload: 'danny'});

// store.dispatch({ type: 'INCREMENT' })
