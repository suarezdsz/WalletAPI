const { body } = require('express-validator');

//helper
const validatorResult = require('../../helper/validate.helper');

 const validatorSigIn = [

    body('email').isEmail(),

    body('password').isLength({ min: 5 }),

    (req, res, next) =>{
        validatorResult(req, res, next);
    }

]

module.exports = validatorSigIn;