const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//instance
const prisma = new PrismaClient();

exports.SigIn = async (req, res) =>{
   try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
 
    });

    //validation for register form email
    if (user.length == 0) return res.status(400).json({success: false, message: 'there is no record'})

    //comprobation validate password
    const isOkPass = await bcrypt.compare(password, user.password);

    //message of exception this password
    if(!isOkPass) return res.status(400).json({msj: 'Incorrect password'})


    //response
    res.send(user);
       
   } catch (error) {
    res.send({error: error.toString()})
   }
 
}

exports.SigUp = async (req, res) =>{
   try {

    req.body.password = bcrypt.hashSync(req.body.password, 8);
  
    const { name, lastname, email, password, phone } = req.body;

    const post = await prisma.user.create({
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
    res.send(post);
       

   } catch (err) {
       res.send({error: err.toString()})
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


