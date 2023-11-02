const ApiError = require('../error/ApiError');

module.exports = function (func, req, res, next, funcName) {
    try {
        func.apply(this, req, res, next)
    } catch (error) {
        return next(ApiError.internalError({ function: funcName, message: error.message }))
    }
}