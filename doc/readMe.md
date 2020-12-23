# redux

## 背景

团队大部分项目以react为基础框架进行开发，对redux不陌生。

最开始接触时，贼最难理解的就是redux，有各种各样的全新的名词 reducer、store、dispatch、middleware等等。

只是知道用法，对其各个函数的理解却很模糊。

redux 就是一个状态管理器。

## redux的场景

1. 某个组件的状态，需要共享
2. 某个状态需要在任何地方都可以拿到
3. 一个组件需要改变全局状态
4. 一个组件需要改变另一个组件的状态

## 使用方式

```js

import { createStore, applyMiddleware } from 'redux';

// store 数据容器
const store = createStore(reducer, applyMiddleware(thunk, timer, logger));

const state = store.getState();

const action = {type:'', payLoad: ''};

store.dispatch(action);

// react中
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

```

## redux 流程图

用户行为触发 store.dispatch(action) 分发 action 并执行中间件，然后 store 自动调用 reducer , reducer 会生成新的 state 返回给 store 并触发重新渲染。

![Aaron Swartz](https://user-images.githubusercontent.com/12526493/48312444-8ff2e100-e5e9-11e8-844a-48ffd9933265.png)

## 总结

1. createStore
创建 store 对象，包含 getState, dispatch, subscribe, replaceReducer

2. reducer
reducer 是一个计划函数，接收旧的 state 和 action，生成新的 state

3. action
action 是一个对象，必须包含 type 字段

4. dispatch
dispatch( action ) 触发 action，生成新的 state

5. subscribe
实现订阅功能，每次触发 dispatch 的时候，会执行订阅函数

6. combineReducers
多 reducer 合并成一个 reducer

7. middleware
扩展 dispatch 函数
