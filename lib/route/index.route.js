const { Router } = require('express');
const express = require('express');
const url = '/api'

//instance
const router = express.Router()

//controller
const controllerAuth = require('../app/controller/auth/auth.controller');
const controllerWallet = require('../app/controller/wallet/wallet.controller');
const controllerExchange = require('../app/controller/exchange/fiat.controller');
const { Biometric, BiometricRegister } = require('../app/controller/auth/biometric.controller');
//validator
    // -- Auth
const validatorSigIn = require('../validator/auth/sigin.validator');
const validatorSigUp = require('../validator/auth/sigup.validator');
    // -- Wallet
const validatorCreateWallet = require('../validator/wallet/wallet.validator');
    // -- Exchange
const validatorCreateExchange = require('../validator/exchange/exchange.post');

//Category
const { getCategory, postCategory, putCategory, getByIDCategory, deleteCategory } = require('../app/controller/category/category');
const validatorCategory = require('../validator/category/category.post');

//Product
const { postProduct, putProduct, deleteProduct, getByIDProduct, getProduct } = require('../app/controller/product/product');
const validatorProduct = require('../validator/product/product');

//Validate with Token
const { validarJWT } = require('../validator/auth/validates-jwt');



//route auth
router.post( url + '/auth/signin', validatorSigIn, controllerAuth.SigIn);

router.put( url + '/auth/biometric/:id', BiometricRegister);
router.post( url + '/auth/biometric', Biometric);

router.post( url + '/auth/signup', validatorSigUp, controllerAuth.SigUp);

// router.get( url + '/auth/account',(req, res)=>{
//     res.send('Endpoint account');
// });

//route wallet
router.post( url + '/wallet', [ validarJWT, validatorCreateWallet], controllerWallet.CreateWallet);

router.get(  url + '/wallet', [ validarJWT] , controllerWallet.ListWallets);

router.put(  url + '/wallet',(req, res)=>{
    res.send('Endpoint wallet put');
});

//route exchange
router.get(  url + '/exchange', controllerExchange.GetExchangeRate);
router.post( url + '/exchange', validatorCreateExchange, controllerExchange.CreateRate);

//route categories
router.get(  url + '/category', [ validarJWT], getCategory );
router.get(  url + '/category/:id', [ validarJWT], getByIDCategory );
router.delete(  url + '/category/:id', [ validarJWT], deleteCategory );
router.put(  url + '/category/:id', [ validarJWT], putCategory );
router.post( url + '/category', [ validarJWT, validatorCategory], postCategory );

//route categories
router.get(  url + '/product', [ validarJWT], getProduct );
router.get(  url + '/product/:id', [ validarJWT], getByIDProduct );
router.delete(  url + '/product/:id', [ validarJWT], deleteProduct );
router.put(  url + '/product/:id', [ validarJWT], putProduct );
router.post( url + '/product', [ validarJWT, validatorProduct], postProduct );

module.exports = router;