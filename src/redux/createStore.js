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
    const listenters = []
    // subscribe 其实就是发布订阅模式
    const subscribe = (listener) => {
        listener && listenters.push(listener);
        return  () => {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }

    }

    // dispatch 就是修改数据的触发函数
    const dispatch = (action) => {
        // reducer 是执行函数
        state = reducer(state, action);
        // 每次 dispatch 订阅的内容即可执行
        listenters.forEach(callback => { callback() })
    }

    const replaceReducer = (nextReducer) => {
        reducer = nextReducer
        /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
        dispatch({ type: Symbol() })
    }

    // 自执行 dispatch 初始化 state
    // 思考：参数 initialState 是作为所有state的初始值，如果 state 都由 initialState 进行初始化会导致 initialState 树及其庞大
    // 拆分 state ,使其能够一个 state 对应一个 reducer
    // 通过一个不匹配任何 type 的 action 触发所有的 reducer 初始化自己的默认 state
    dispatch({ type: Symbol() })

    // 获取最新状态的函数
    const getState = () => state;


    return { getState, dispatch, subscribe, replaceReducer }
}

export default createStore;