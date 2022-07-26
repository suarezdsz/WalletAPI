const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validatorProduct = [
    body('user_id').not().isEmpty(),
    body('name').not().isEmpty().isString(),
    body('currency').not().isEmpty().isString(),
    body('price').not().isEmpty(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }
    
]

module.exports = validatorProduct;