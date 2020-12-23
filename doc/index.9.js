
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

    // 拆分 state ,使其能够一个 state 对应一个 reducer
    // 通过一个不匹配任何 type 的 action 触发所有的 reducer 初始化自己的默认 state
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
            const previousStateForKey = state[key];
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

console.log(store.getState(),'===');

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})

store.dispatch({ type: 'SETNAME', payload: 'danny'});

store.dispatch({ type: 'INCREMENT' })
