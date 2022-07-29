exports.success = function( res, message, data = null, code = 200){
    response( res, message, data, code, true )
}

exports.error = function( res, message, data = null, code = 400){
    response( res, message, data, code, false )
}

const response = ( res, message, data, code, success ) => {
    return (
        res.status(code).send({
            success,
            message,
            data
        })
    )
}