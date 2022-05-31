const { Router } = require('express');
const express = require('express');

//instance
const router = express.Router()

//controller
const controllerAuth = require('../controller/auth/auth.controller');
const controllerWallet = require('../controller/wallet/wallet.controller');

//validator
    // -- Auth
const validatorSigIn = require('../validator/auth/sigin.validator');
const validatorSigUp = require('../validator/auth/sigup.validator');
    // -- Wallet
const validatorCreateWallet = require('../validator/wallet/wallet.validator');

//route auth
router.post('/auth/sigin', validatorSigIn, controllerAuth.SigIn);


router.post('/auth/sigup', validatorSigUp, controllerAuth.SigUp);


router.get('/auth/account',(req, res)=>{
    res.send('Endpoint account');
});

//route wallet

router.post('/wallet',validatorCreateWallet, controllerWallet.CreateWallet);

router.get('/wallet', controllerWallet.ListWallets);

router.put('/wallet',(req, res)=>{
    res.send('Endpoint wallet put');
});



module.exports = router;