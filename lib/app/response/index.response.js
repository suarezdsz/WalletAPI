exports.success = function( res, message, data = null, code = 200){
    response( res, message, data, code )
}

exports.error = function( res, message, data = null, code = 400){
    response( res, message, data, code )
}

const response = ( res, message, data, code ) => {
    return (
        res.status(code).send({
            message,
            data
        })
    )
}