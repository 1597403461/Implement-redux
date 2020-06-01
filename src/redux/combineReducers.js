/**
 * 我们知道 reducer 是一个计划函数，接收老的 state，按计划返回新的 state。如果我们的项目里有大量的state，每个 state 都需要计划函数，如果全部写在一起会会导致 reducer 函数及其庞大复杂
 * 我们肯定会按组件维度来拆分出很多个 reducer 函数，然后通过一个函数来把他们合并起来
 * combineReducers 函数就是将其合并为一个 redncer 函数
 * 其实就是将所有的子 reducer 函数在合并后的 reducer 函数中遍历执行
 * 此处有个限制: state 的 key 值必须与传进来的参数 reducers 对象 key 值保持一致

 * @param {*} reducers
 */
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