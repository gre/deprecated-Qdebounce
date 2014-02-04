var Q = require("q");
var _ = require("lodash");

function Qdebounce (func, wait) {
    var promise = Q();
    var context, args;
    var recallNeeded = false;
    return function () {
        context = this;
        args = arguments;
        if (!promise.isPending()) {
            promise = Q.delay(wait)
            .then(function rec () {
                recallNeeded = false;
                return Q.fapply(_.bind(func, context), args)
                    .then(function (res) {
                        if (recallNeeded) {
                            return rec();
                        }
                        else {
                            return res;
                        }
                    }, function (e) {
                        if (recallNeeded) {
                            return rec();
                        }
                        else {
                            throw e;
                        }
                    });
            });
        }
        else {
            recallNeeded = true;
        }
        return promise;
    };
}

module.exports = Qdebounce;
