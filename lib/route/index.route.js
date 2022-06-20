const { Router } = require('express');
const express = require('express');

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

//route auth
router.post('/api/auth/sigin', validatorSigIn, controllerAuth.SigIn);


router.post('/api/auth/sigup', validatorSigUp, controllerAuth.SigUp);


router.get('/api/auth/account',(req, res)=>{
    res.send('Endpoint account');
});

//route wallet

router.post('/api/wallet',validatorCreateWallet, controllerWallet.CreateWallet);

router.get('/api/wallet', controllerWallet.ListWallets);

router.put('/api/wallet',(req, res)=>{
    res.send('Endpoint wallet put');
});

//route exchange
router.get('/api/exchange', controllerExchange.GetExchangeRate);
router.post('/api/exchange', validatorCreateExchange, controllerExchange.CreateRate);



module.exports = router;