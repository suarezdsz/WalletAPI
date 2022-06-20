const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//instance
const prisma = new PrismaClient();

//response
const response = require('../../response/index.response');

exports.SigIn = async (req, res) =>{
   try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
 
    });

    //validation for register form email
    if (user.length == 0) return response.error(res, 'there is no record', 400);

    //comprobation validate password
    const isOkPass = await bcrypt.compare(password, user.password);

    //message of exception this password
    if(!isOkPass) return response.error(res, 'Password Incorrect', 400);


    //response
   // res.send(user);
   response.success(res, user, 200);
   } catch (error) {
    response.error(res, error.toString(), 500);
   }
 
}

exports.SigUp = async (req, res) =>{
   try {

    req.body.password = bcrypt.hashSync(req.body.password, 8);
  
    const { name, lastname, email, password, phone } = req.body;

    const user = await prisma.user.create({
        data: {
          name,
          lastname,
          email,
          password, 
          phone
        },
        select: {
            id: true,
            lastname : true, 
            email: true,  
            phone: true
            
        }
      })
 
    response.success(res, user, 200);

   } catch (error) {
    response.error(res, error.toString(), 500);
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


