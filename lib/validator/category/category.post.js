const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validatorCategory = [
 
    body('name').not().isEmpty().isString(),

    body('user_id').not().isEmpty(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }
    
]

module.exports = validatorCategory;