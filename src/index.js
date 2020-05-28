import { combineReducers, createStore, applyMiddleware } from './redux/index.js';
import { logger, timer } from './middleware/index.js';


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

const store = createStore(reducer, applyMiddleware(timer, logger));

store.subscribe(() => { console.log(store.getState()) })

store.dispatch(({ type: 'NUMBER', payLoad: 2 }));
