const logger = (store) => (next) => (action) => {
    console.log('pre state', store.getState());
    next(action);
    console.log('action', action)
    console.log('next state', store.getState())
}

export default logger;