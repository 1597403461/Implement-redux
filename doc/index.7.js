// 按照组件的维度来将各个状态的reducer进行拆分，然后通过一个函数将所有的reducer合并起来岂不是美滋滋

let initialState = {
    age: 10,
    name: 'lily'
}

const nameReducer = (name, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return action.payLoad
        default:
            return name;
    }
}


const ageReducer = (age, action) => {
    switch (action.type) {
        case 'INSERT':
            return age + 1
        default:
            return age;
    }
}

const store = createStore(reducer, initialState);


// 合并reducer