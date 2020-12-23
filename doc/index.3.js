

function createStore(initialState) {
    let state = initialState;

    let listenters = [];

    function subscribe(listener) {
        listenters.push(listener)
    }


    function changeState(newState) {
        state = newState;
        // 改变时，通知所有的订阅者
        listenters.forEach(callback => { callback() })
    }

    const getState = () => state;

    return {
        subscribe,
        changeState,
        getState
    }
}

/** ---------------------------------------------------------- */

let initialState = {
    age:10,
    name: 'lily'
}

let store = createStore(initialState);

store.subscribe(() => {
    // 突然发现无法订阅函数内被更改后的数据
    // 需要一个方法返回最新数据
})

store.changeState({
    name: 'danny',
    age: 12
});