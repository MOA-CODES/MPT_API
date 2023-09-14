const {StatusCodes} = require('http-status-codes')
const errorHandler = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong try again later'
    }

        if(err.name === 'ValidationError') {
            customError.statusCode = StatusCodes.BAD_REQUEST
            customError.msg = Object.values(err.errors).map((item)=> item.message).join(', ')
        }

        if(err.name === 'CastError') {
            customError.msg = `id : ${err.value} doesn't exist`
            customError.statusCode = StatusCodes.NOT_FOUND
        }

    return res.status(customError.statusCode).json({Error:{Status: customError.statusCode, Msg: err.message}})
}

module.exports = errorHandler