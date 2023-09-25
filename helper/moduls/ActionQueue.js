// myModule.js
const myObject = {
    func1: function() {
      console.log('Функция 1');
    },
    func2: function() {
      console.log('Функция 2');
    },
    func3: function() {
      console.log('Функция 3');
    }
};

const actionQueue = ['func1', 'func2', 'func3'];

function processActionQueue() {
if (actionQueue.length > 0) {
    const action = actionQueue.shift();
    if (typeof myObject[action] === 'function') {
    myObject[action]();
    }
    setTimeout(processActionQueue, 1000);
}
}

export { processActionQueue };