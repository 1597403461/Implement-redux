function createStore (initialState) {
    // 简单的状态管理器
    let state = initialState

    let listenters = [];

    // 创建订阅函数
    function subscribe(listener) {
        listenters.push(listener)
    }

    function changeNumber(newState) {
        state = newState;
        // 改变时，通知所有的订阅者
        listenters.forEach(callback => { callback() })
    }

    const getState = () => state;

    return {
        subscribe,
        changeNumber,
        getState
    }
}

/** ---------------------------------------------------------- */

const store= createStore({name:'lily', age: 11})
store.subscribe(() => {
    const state =store.getState();
    console.log(state)
})

store.changeNumber({
    ...store.getState(),
    age: 15
});

// question1: 只能管理number，其他的不行
// questino2: 把这些函数封装起来岂不是更好