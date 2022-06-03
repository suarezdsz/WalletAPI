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



module.exports = router;