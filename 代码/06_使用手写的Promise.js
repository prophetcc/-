const Promise = require('./05_手写Promise')

const p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1000);
    }, 1000)
})

// p.then(function (value) {
//     console.log(value);
//     return new Promise(function (resolve, reject) {
//         resolve(new Promise(function (resolve, reject) {
//             resolve(1000);
//         }));
//     });
// }, function (reason) {

// }).then(function (value) {
//     console.log(value);
// })
p.then(function (value) {
    throw new Error('错误');
}, function (reason) {
    console.log(reason);
}).then(null, function (reason) {
    console.log('err', reason);
})