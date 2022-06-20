

exports.success = function( response, message, status){
    let statusCode = status || 200;
    let statusMessage = message || '';

    response.status(statusCode).send({
        error: false,
        status: statusCode,
        data: statusMessage
    });
}

exports.error = function( response, message, status){
    let statusCode = status || 500;
    let statusMessage = message || 'Internet Server Error';

    response.status(statusCode).send({
        error: false,
        status: statusCode,
        data: statusMessage
    });
}