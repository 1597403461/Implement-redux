import compose from './compose';

const applyMiddleware = (...args) => (oldCreateStore) => (reducer, initialState) => {
    const store = oldCreateStore(reducer, initialState);
    const simpleStore = { getState: store.getState }
    const chain = args.map(item => item(simpleStore));
    let next = store.dispatch;
    // chain.reverse().forEach((item) => {
    //     next = item(next)
    // })
    next = compose(...chain)(next);
    store.dispatch = next;
    return store;
}

export default applyMiddleware