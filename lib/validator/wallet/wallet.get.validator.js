const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validateGetWallet = [
 
    query('user_id').not().isEmpty(),



    (req, res, next) =>{
        validatorResult(req, res, next);
    }

    
]

module.exports = validateGetWallet;