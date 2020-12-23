// 简单的状态管理器

// number 作为状态（数据）
let state = {
    number : 1
};

state.number = 2;

console.log(state.number);

// question: 修改 number 之后，使用 number 的地方不能收到通知。我们可以使用发布-订阅模式来解决这个问题。