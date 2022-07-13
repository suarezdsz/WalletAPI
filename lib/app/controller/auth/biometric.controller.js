const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helper/generates-jwt')

//instance
const prisma = new PrismaClient();

//response
const response = require('../../response/index.response');

exports.Biometric = async (req, res) =>{
   try {
    const { key } = req.body;

    // Generate the JWT
    const token = await generarJWT( null ,key );

    // user.token = token;
    // delete user.password

    response.success(res, 'User Sign In' , token);

   } catch (error) {
    console.log(error)
    response.error(res, error.toString(), null, 500);
   }

}



