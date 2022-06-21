

exports.success = function( response, message, data){


    response.status(200).send({
        success: true,
        message: message,
        data: data
    });
}

exports.error = function( response, message, data){


    response.status(400).send({
        success: false,
        message: message,
        data: data
    });
}