const combineReducers = (reducers) => (state = {}, action) => {
    const keys = Object.keys(reducers);
    const returnState = {};
    for (let key of keys) {
        const preState = state[key];
        const reducer = reducers[key];
        const newState = reducer(preState, action);
        returnState[key] = newState
    }
    return returnState;
}

export default combineReducers