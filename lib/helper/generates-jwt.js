const { sign } = require('jsonwebtoken');

const generarJWT = ( id = '' , key = null  ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };
        const SECRETORPRIVATEKEY = key || process.env.SECRETORPRIVATEKEY

        sign( payload, SECRETORPRIVATEKEY , {
            expiresIn: 60*60*24*7
        } , ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'The token could not been generated' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = { generarJWT }
