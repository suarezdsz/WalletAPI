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
    console.log('la key del request: ', key)
    // const user = await prisma.user.findUnique({
    //     where: { email }
    // });

    // validation for register form email
    // if(!user) return response.error(res, 'User or Password Incorrect');

    //comprobation validate password
    // const isOkPass = await bcrypt.compare(password, user.password);

    //message of exception this password
    // if(!isOkPass) return response.error(res, 'User or Password Incorrect');

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



