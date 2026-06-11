require('dotenv').config();
var express = require('express');
 var path = require('path');
var mongoose = require('mongoose');

// --- MongoDB connection --- 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tasksRouter = require('./routes/tasks');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/tasks', tasksRouter);

module.exports = app;


// app.listen(3000, ()=> {
//     console.log("server is running");
// });