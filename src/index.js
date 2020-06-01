import { combineReducers, createStore, applyMiddleware } from './redux/index.js';
import { logger, timer, thunk } from './middleware/index.js';


const infoReducer = (state = 'danny', action) => {
    switch (action.type) {
        case 'NAME':
            return action.payLoad
        default:
            return state
    }
}

const contReducer = (state = 0, action) => {
    switch (action.type) {
        case 'NUMBER':
            return action.payLoad
        default:
            return state
    }
}
const reducer = combineReducers({
    cont: contReducer,
    info: infoReducer,
})

const store = createStore(reducer, applyMiddleware(thunk, timer, logger));

// store.subscribe(() => { console.log(store.getState()) })

const setNumber = () => (dispatch, getState) => {
    console.log('start')
    dispatch({ type: 'NUMBER', payLoad: 2 })
    console.log('end')
}

store.dispatch(setNumber());