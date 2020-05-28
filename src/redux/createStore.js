const createStore = (reducer, initialState, rewriteCreateStoreFunc) => {

    if (typeof initialState === 'function') {
        rewriteCreateStoreFunc = initialState;
        initialState = undefined;
    }

    if (rewriteCreateStoreFunc) {
        const newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer, initialState);
    }
    let state = initialState;
    const listenters = []
    const subscribe = (listener) => {
        listener && listenters.push(listener);
        return  () => {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }

    }
    const dispatch = (action) => {
        state = reducer(state, action);
        listenters.forEach(callback => { callback() })
    }

    const replaceReducer = (nextReducer) => {
        reducer = nextReducer
        /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
        dispatch({ type: Symbol() })
    }

    dispatch({ type: Symbol() })
    const getState = () => state;


    return { getState, dispatch, subscribe, replaceReducer }
}

export default createStore;