const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../../helper/generates-jwt')

//instance
const prisma = new PrismaClient();

//response
const response = require('../../response/index.response');

exports.SigIn = async (req, res) =>{
   try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    // validation for register form email
    if(!user) return response.error(res, 'User or Password Incorrect');

    //comprobation validate password
    const isOkPass = await bcrypt.compare(password, user.password);

    //message of exception this password
    if(!isOkPass) return response.error(res, 'User or Password Incorrect');

    // Generate the JWT
    const token = await generarJWT( user.id );

    user.token = token;
    delete user.password

    response.success(res, 'User Sign In' , user);

   } catch (error) {
    response.error(res, error.toString());
   }

}

exports.SigUp = async (req, res) =>{
   try {

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    const { name, lastname, email, password, phone } = req.body;

    let user = await prisma.user.findUnique({
        where: { email }
      })
      
    if( !!user ) return response.error(res, 'The user is already registred');

    user = await prisma.user.create({
        data: {
          name,
          lastname,
          email,
          password, 
          phone
        },
        select: {
            id: true,
            name : true,
            lastname : true,
            email: true,
            phone: true
        }
      });

    response.success(res, 'User Sign Up', user);

   } catch (error) {
    response.error(res, error.toString());
   }
}


exports.Account = async (req, res) =>{
    res.send(req);
    /*
    const post = prisma.post.create({      
        data: {
            
        }
    });

    console.log(post)*/
}


