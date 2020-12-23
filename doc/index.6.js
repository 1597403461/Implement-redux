// 改名

const createStore = function (reducer, initState) {
    let state = initState;
    let listenters = [];

    function subscribe(listener) {
        listenters.push(listener);
    }

    function dispatch(action) {
        /*请按照我的计划修改 state*/
        state = reducer(state, action);
        listenters.forEach(callback => { callback() })
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

/** ---------------------------------------------------------- */


let initialState = {
    age: 10,
    name: 'lily'
}

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                age: state.age + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                age: state.age - 1
            }
        default:
            return state;
    }
}

let store = createStore(reducer, initialState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})
/*自增*/
store.dispatch({
    type: 'INCREMENT'
});
/*自减*/
store.dispatch({
    type: 'DECREMENT'
});


/**
 * 我们知道 reducer 是一个计划函数，接收老的 state，按计划返回新的 state。如果我们的项目里有大量的 state ，每个 state 都需要计划函数，如果全部写在一起会会导致 reducer 函数及其庞大复杂
 * 我们肯定会按组件维度来拆分出很多个 reducer 函数
 */