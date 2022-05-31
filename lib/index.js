const express = require('express');
const bodyParser = require('body-parser');


//instance
const route = require('./route/index.route');
const keys = require('../lib/config/keys');

const app = express();

app.set('key', keys.key);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())
app.use(route);
app.listen(3000, ()=>{
    console.log('Server Connection');
});