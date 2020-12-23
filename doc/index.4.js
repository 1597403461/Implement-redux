
function createStore(initialState) {
    let state = initialState

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
    age: 10,
    name: 'lily'
}

let store = createStore(initialState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.name + '的年龄是' + state.age);
})

store.changeState({
    ...store.getState(),
    age: 'ladygaga'
})

store.changeState({
    ...store.getState(),
    age: store.getState().age + 4
})


// store.changeState({
//     ...store.getState(),
//     age: store.getState().age - 1
// })


// store.changeState({
//     ...store.getState(),
//     age: 'ladygaga'
// })
// question: 此时可随意更改 age 或者 name