const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helper/generates-jwt')

//instance
const prisma = new PrismaClient();

//response
const response = require('../../response/index.response');

exports.Biometric = async (req, res) =>{

   const { id } = req.params;

   try {
    const { key } = req.body;

    let user = await prisma.users.findUnique({
      where: { id }
  });

    // validation for register form email
    if(!user) return response.error(res, 'User or Password Incorrect');

    // Generate the JWT
    const token = await generarJWT( null ,key );

    response.success(res, 'User Sign In' , token);

   } catch (error) {
    console.log(error)
    response.error(res, error.toString(), null, 500);
   }

}



