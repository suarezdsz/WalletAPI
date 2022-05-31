const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validateCreateWallet = [
 
    body('user_id').not().isEmpty(),

    body('name').not().isEmpty(),

    body('login').not().isEmpty(),

    body('password').not().isEmpty(),

    body('type').not().isEmpty(),

    body('refresh_token').not().isEmpty(),

    body('access_token').not().isEmpty(),

    body('status').isBoolean(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }

    
]

module.exports = validateCreateWallet;