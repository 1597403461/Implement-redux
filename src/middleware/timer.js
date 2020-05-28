const timer = (store) => (next) => (action) => {
    console.log(new Date());
    next(action)
}

export default timer