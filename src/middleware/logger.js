const logger = (store) => (next) => (action) => {
    console.log('start');
    next(action);
    console.log('end')
}

export default logger;