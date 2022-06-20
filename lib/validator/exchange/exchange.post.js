const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validatorPostExchange = [
 
    body('type').not().isEmpty(),

    body('value_rate').isNumeric(),

    body('currency').not().isEmpty(),

    body('status').not().isEmpty(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }
    
]

module.exports = validatorPostExchange;