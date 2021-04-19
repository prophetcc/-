function Promise(executor) {
    const self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    function resolve(value) {
        if (self.status !== 'pending') return;
        self.value = value;
        self.status = 'resolved';
        self.onFulfilledCallbacks.forEach(function (fn) {
            fn();
        })
    }

    function reject(reason) {
        if (self.status !== 'pending') return;
        self.reason = reason;
        self.status = 'rejected';
        self.onRejectedCallbacks.forEach(function (fn) {
            fn();
        })
    }

    try {
        executor(resolve, reject);
    }
    catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    let called = false;
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            const then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {    //{then:123}
                if (called) return;
                called = true;
                resolve(x);
            }
        }
        catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
};

Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value };
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err };

    const promise2 = new Promise(function (resolve, reject) {
        if (self.status === 'resolved') {
            setTimeout(function () {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0)
        } else if (self.status === 'rejected') {
            setTimeout(function () {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (e) {
                    reject(e);
                }
            }, 0)
        } else if (self.status === 'pending') {
            self.onFulfilledCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0)
            });
            self.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0)
            });
        }
    })

    return promise2;
}

Promise.defer = Promise.deferred = function () {
    let deferred = {}

    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })
    return deferred
}

module.exports = Promise;