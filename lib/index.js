const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');


//instance
const route = require('./route/index.route');
const keys = require('../lib/config/keys');

const app = express();

//job.start();

app.set('key', keys.key);
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());
app.use(route);
app.listen(3001, ()=>{
    console.log('Server Connection');
});