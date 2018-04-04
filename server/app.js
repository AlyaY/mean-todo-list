const express = require('express');
const ItemController = require('./Controllers/ItemController');
const UserController = require('./Controllers/UserController');
const app = express();

const db = require('./db');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*")
    next();
 });

app.use('/items', ItemController);
app.use('/users', UserController);

module.exports = app;