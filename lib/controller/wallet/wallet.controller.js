const {PrismaClient} = require('@prisma/client');

//instance
const prisma = new PrismaClient();


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
              status
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
        res.send(wallet);
           
       } catch (error) {
        res.send({error: error.toString()})
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

        res.send(wallet);
    } catch (error) {
        res.send({error: error.toString()})
    }

}

exports.GetWallet = async (req, res) =>{
    
}

exports.PutWallet = async (req, res) =>{
    
}