var Q = require("q");
var _ = require("lodash");

function Qdebounce (func, wait) {
    var promise = Q();
    var context, args;
    return function () {
        context = this;
        args = arguments;
        if (!promise.isPending()) {
            promise = Q.delay(wait)
            .then(function () {
                return Q.fapply(_.bind(func, context), args);
            });
        }
        return promise;
    };
}

module.exports = Qdebounce;
