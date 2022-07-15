const {PrismaClient} = require('@prisma/client');
const https = require('https');


//instance
const prisma = new PrismaClient();

const makeCoinBinance = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=69497b8f-7ff6-4ec4-8f95-b7669f5b4eb4';


exports.SyncUpBTCUSD = async (req, res) =>{
    try {
        const response = https.get(makeCoinBinance, (response)=>{

            let body = '';
           response.on('data', stream =>{
                body += stream;
           });

           response.on('end', () =>{
            console.log(JSON.parse(body));
           });
        });

        
    } catch (error) {
     res.send({error: error.toString()})
    }
  
 }

 exports.CreateRate = async (req, res) =>{
    try {
        const { type, value_rate, currency, status } = req.body;
       
        const Exchange = await prisma.ExchangeRate.create({
            data: {
                type,
                currency,
                status,
                value_rate
            },
            select: {
                id: true,
                type : true, 
                currency: true,  
                status: true,
                value_rate: true
                
            }
        });
    
    
        //response
        res.send(Exchange);
           
       } catch (error) {
        res.send({error: error.toString()})
       }
}


exports.GetExchangeRate = async (req, res) =>{
    try {
     const { type } = req.body;
 
     const Exchange = await prisma.ExchangeRate.findUnique({
         where: {
             type: type,
         },
  
     });

 
     //response
     res.send(Exchange);
        
    } catch (error) {
     res.send({error: error.toString()})
    }
  
 }