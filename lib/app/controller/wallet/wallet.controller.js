const {PrismaClient} = require('@prisma/client');

//instance
const prisma = new PrismaClient();

//response
const response = require('../../response/index.response');

exports.CreateWallet = async (req, res) =>{
    try {
        const { user_id, name, login, password, 
                refresh_token, access_token, type, status } = req.body;
    
        const wallet = await prisma.wallet.create({
            data: {
              user_id,
              name,
              login,
              password, 
              refresh_token,
              access_token,
              type, 
            },
            select: {
                id: true,
                user_id : true, 
                name: true,  
                login: true,
                password: true,
                refresh_token: true,
                access_token: true,
                type: true, 
                status: true
                
            }
        });
    
    
        //response
        response.success(res, 'Create Wallet' , wallet);
   
           
       } catch (error) {
        response.error(res, error.toString(), 500);
       }
}

exports.ListWallets = async (req, res) =>{
    try {
    
     const { user_id } = req.query;
        const wallet = await prisma.wallet.findMany({
            where: {
                user_id: user_id
            }
        });

        response.success(res,'List Wallets from User' , wallet);
    } catch (error) {
        response.error(res, error.toString(), 500);
    }

}

exports.GetWallet = async (req, res) =>{
    
}

exports.PutWallet = async (req, res) =>{
    
}