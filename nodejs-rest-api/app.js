var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./config/database');
var cors = require('cors');


var indexRouter = require('./routes/index');

var app = express();

database.connectDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/register', indexRouter);

module.exports = app;
