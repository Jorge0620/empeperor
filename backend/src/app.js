const express = require('express');
const axios = require('axios');

const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const routes = require('./routes');
const transactionController = require('./controllers')
const https = require('https');


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// enable cors
app.use(cors());
app.options('*', cors());

// axios.get('https://www.dextools.io/shared/data/swaps?chain=ether&pair=0x3bdfc2052fa47af018faa3e9f0b50b5fd2796076')
//     .then(res => {
//         console.log('res: ', res.data)
//     })

try {
    mongoose.connect("mongodb://127.0.0.1:27017/empeperor", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false}).then(() => {
      console.log('Connected to mongo')
    });
} catch (e){
    console.log(e)
}

// v1 api routes
app.use('/empeperor', routes);

module.exports = app;
