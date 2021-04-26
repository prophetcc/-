// var target = {
//     name: 'poetries'
// };
// var logHandler = {
//     get: function (target, key) {
//         console.log(`${key} 被读取`);
//         return target[key];
//     },
//     set: function (target, key, value) {
//         console.log(`${key} 被设置为 ${value}`);
//         target[key] = value;
//     }
// }
// var targetProxy = new Proxy(target, logHandler);

// targetProxy.name; // 控制台输出：name 被读取
// targetProxy.name = 'others'; // 控制台输出：name 被设置为 others

// console.log(target.name); // 控制台输出: others
// console.log(targetProxy.name);

// const person = {
//     name: "wxh",
//     age: 20,
// };

// const personProxy = new Proxy(person, {
//     get(target, property) {
//         // target源数据
//         // property 访问的属性名
//         console.log(target, property);

//         return property in target ? target[property] : "查无此属性";
//     },
//     set(target, property, value) {
//         if (property === "age") {
//             // 如果age不是一个整数，抛出错误
//             if (!Number.isInteger(value)) {
//                 throw new TypeError(`${value}不是一个整数`);
//             }
//         }
//         console.log("设置数据");
//     },
// });

// // personProxy.age = "str"; // 报错，内部做了限制

// console.log(personProxy.age1); // 查无此属性

// personProxy.gender = true;


// const arr = [];

// const listProxy = new Proxy(arr, {
//     set(target, property, value) {
//         // set: 0 100
//         // set: length 
//         console.log("set:", property, value);
//         target[property] = value;
//         return true; // 表示设置成功
//     },
// });
// listProxy.push(100);
// console.log(arr);


// const arr = [];

// const listProxy = new Proxy(arr, {
//     set(target, property, value) {
//         target[property] = value;
//         // return true
//     },
// });
// listProxy.push(100);
// console.log(listProxy);


// const obj = {};
// const objProxy = new Proxy(obj, {
//     set(target, property, value) {
//         console.log('执行了set');
//         // target[property] = value;
//         return Reflect.set(target, property, value)
//     }
// })

// objProxy.age = 20;
// console.log(obj);

// const obj = {
//     foo: "23",
//     bar: "456",
// };

// const proxy = new Proxy(obj, {
//     get(target, property) {
//         // proxy内部默认使用的是Reflect的逻辑
//         // 我们一般处理完自己逻辑以后，get逻辑交给Reflect来实现
//         console.log("调用了get");
//         return Reflect.get(target, property);
//     },
// });

// console.log(proxy.bar);

// const obj = {
//     foo: '23',
//     bar: '456',
// }

// console.log(Reflect.has(obj, 'name')); // 是否包含name属性
// console.log(Reflect.deleteProperty(obj, 'age')); // 删除属性
// console.log(Reflect.ownKeys(obj)); // 获取自身属性


const obj = {
    foo: "23",
    bar: "456",
};

const proxy = new Proxy(obj, {
    get(target, property) {
        console.log("调用了get");
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        console.log("调用了set");
        return Reflect.set(target, property, value);
    },
});

proxy.age = 20;
console.log(obj);