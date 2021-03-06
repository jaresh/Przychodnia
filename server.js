/*jshint smarttabs:true */
/*global require:false */
/*global __dirname:false */
/*global process:false */
// checked with jshint

//== setup
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');

var sessionStore = new connect.session.MemoryStore();
var sessionSecret = 'wielkiSekret44';
var sessionKey = 'connect.sid';

mongoose.connect('mongodb://localhost/test'); 

require('./config/passport')(passport); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: sessionStore,
    key: sessionKey,
    secret: sessionSecret
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./app/routing/jsapinews.js')(app); 
require('./app/routing/jsapivisits.js')(app); 
require('./app/routing/jsapidocs.js')(app); 
require('./app/routing/jsapiusers.js')(app); 
require('./app/routing/routes.js')(app, passport); 

app.listen(port);
console.log('Server starts on port ' + port);