
// 有计划的状态管理器

// 制定一个 state 修改计划，告诉 store，我的修改计划是什么

// 修改 store.dispatch 方法，告诉它修改 state 的时候，按照我们的计划修改。

// 设置一个 reducer 函数，接收现在的 state，和一个 action，返回经过改变后的新的 state
/*注意：action = {type:'',payLoad:''}, action 必须有一个 type 属性*/
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                age: state.age + 1
            }
        case "SETNAME":
            return {
                ...state,
                name: action.payLoad
            }
        default:
            return state;
    }
}

// 我们把这个计划告诉 store，store.dispatch 以后改变 state 要按照我的计划来改。

/*增加一个参数 reducer*/
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
/*把plan函数*/
let store = createStore(reducer, initialState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})
/*自增*/
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'SETNAME',
    payLoad: 'danny'
});
// /*我想随便改 计划外的修改是无效的！*/
// store.dispatch({
//     count: 'abc'
// });