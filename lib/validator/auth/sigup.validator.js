const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validateSigUp = [
 
    body('name').not().isEmpty(),

    body('lastname').not().isEmpty(),

    body('email').isEmail(),

    body('password').isLength({ min: 5 }),

    body('phone').isNumeric(),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }

    
]

module.exports = validateSigUp;