const { Router } = require('express');
const express = require('express');
const url = '/api'

//instance
const router = express.Router()

//controller
const controllerAuth = require('../app/controller/auth/auth.controller');
const controllerWallet = require('../app/controller/wallet/wallet.controller');
const controllerExchange = require('../app/controller/exchange/exchange.controller');
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

//route auth
router.post( url + '/auth/sigin', validatorSigIn, controllerAuth.SigIn);


router.post( url + '/auth/sigup', validatorSigUp, controllerAuth.SigUp);

router.get( url + '/auth/account',(req, res)=>{
    res.send('Endpoint account');
});

//route wallet
router.post( url + '/wallet',validatorCreateWallet, controllerWallet.CreateWallet);

router.get(  url + '/wallet', controllerWallet.ListWallets);

router.put(  url + '/wallet',(req, res)=>{
    res.send('Endpoint wallet put');
});

//route exchange
router.get(  url + '/exchange', controllerExchange.GetExchangeRate);
router.post( url + '/exchange', validatorCreateExchange, controllerExchange.CreateRate);

//route categories
router.get(  url + '/category', getCategory );
router.get(  url + '/category/:id', getByIDCategory );
router.delete(  url + '/category/:id', deleteCategory );
router.put(  url + '/category/:id', putCategory );
router.post( url + '/category', validatorCategory, postCategory );


module.exports = router;