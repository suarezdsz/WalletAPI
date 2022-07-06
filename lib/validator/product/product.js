const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validatorProduct = [
 
    body('name').not().isEmpty().isString(),
    
    body('img').not().isEmpty().isString(),

    body('category_id').not().isEmpty(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }
    
]

module.exports = validatorProduct;