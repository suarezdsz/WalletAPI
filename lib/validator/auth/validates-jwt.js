const { resp, request } = require('express');
const jwt = require('jsonwebtoken');
const response = require('../../app/response/index.response');

const { PrismaClient } = require('@prisma/client');
//instance
const prisma = new PrismaClient();

const validarJWT = async( req = request, res = resp, next ) => {

    let token = req.headers.authorization
    if ( !token ) {
        return response.error(res, 'There is not token in request' , 401);
    }

    token = req.headers.authorization.split(' ')[1];

    try {

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al id
        const user = await prisma.users.findUnique({
            where: { id }
        });

        if( !user ) {
            return res.status(401).json({
                msg: 'Token does not valid'
            })
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token does not valid',
            error
        })
    }

}

module.exports = {
    validarJWT
}