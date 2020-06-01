
const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        const { dispatch, getState } = store;
        return action(dispatch, getState);
    }

    return next(action);
};;

export default thunk;
