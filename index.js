var Q = require("q");

module.exports = function Qdebounce (func, wait) {
    var promise = Q();
    var context, args;
    return function () {
        context = this;
        args = arguments;
        if (!promise.isFulfilled()) return promise;
        promise = Q.delay(wait)
            .then(function () {
                return Q.fapply(_.bind(func, context), args);
            });
        return promise;
    };
};
