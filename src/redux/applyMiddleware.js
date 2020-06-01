import compose from './compose';

const applyMiddleware = (...args) => (oldCreateStore) => (reducer, initialState) => {
    const store = oldCreateStore(reducer, initialState);
    // const simpleStore = { getState: store.getState }
    const chain = args.map(item => item(store));
    let next = store.dispatch;
    // chain.reverse().forEach((item) => {
    //     next = item(next)
    // })
    // compose是redux将[A, B, C] 转换成 A(B(C(next)))的内置方法
    next = compose(...chain)(next);
    store.dispatch = next;
    return store;
}

export default applyMiddleware