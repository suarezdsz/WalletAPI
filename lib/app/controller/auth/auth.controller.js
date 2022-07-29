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

    const user = await prisma.users.findUnique({
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
    console.log(error)
    response.error(res, error.toString(), null, 500);
   }

}

exports.SigUp = async (req, res) =>{
   try {

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    const { name, lastname, email, password, phone, reference } = req.body;

    let user = await prisma.users.findUnique({
        where: { email }
    });

    let user_refered_me;
      
    if( !!user ) return response.error(res, 'The user is already registred');

    const date = new Date()
    const year = date.getFullYear()
    const mounth = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    const dateExpiration = new Date( year, mounth, day, hour + 6, minute )

    if( date > dateExpiration) {

    }
    if( date < dateExpiration) {

    }

    if(reference){//Validate if the code reference exists
        console.log('la reference: ', reference)
        user_refered_me = await prisma.references.findUnique({
            where: { code_reference: reference }
        });//This is the user that refered me
        console.log(' el user que me refirio: ', user_refered_me)
    
        // validation for register form email
        if(!user_refered_me) return response.error(res, 'Reference does not Exist');
    }

    const code_reference = generateString(8)

    user = await prisma.users.create({
        data: {
          name,
          lastname,
          email,
          password,
          phone,
          code_reference
        },
        select: {
            id: true,
            name : true,
            lastname : true,
            email: true,
            phone: true,
            code_reference: true
        }
    });

    await prisma.references.create({
        data: {
          user_id: user.id,
          code_reference,
          status: true,

        },
        select: {
            code_reference: true,
            user_id : true
        }
    });

    if(reference){//If the user is registed with code reference
        await prisma.group_Reference.create({
            data: {
              reference_id: user_refered_me.id,
              user_refered: user.id
            },
            select: {
                reference_id: true,
                user_refered : true
            }
        });
    }
    const token = await generarJWT( user.id );
    user.token = token;
    response.success(res, 'User Sign Up', user);

   } catch (error) {
    console.log(error)
    response.error(res, error.toString(), null, 500);
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

function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


