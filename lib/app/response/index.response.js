

exports.success = function( response, message, data = null){

    response.status(200).send({
        success: true,
        message,
        data
    });
}

exports.error = function( response, message, data = null){

    response.status(400).send({
        success: false,
        message,
        data
    });
}