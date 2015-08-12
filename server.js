// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var fs = require("fs");
var mongojs = require('mongojs');
var db = mongojs('users', ['user']);
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var bcrypt = require('bcrypt-nodejs');
var localStrategy = require('passport-local').Strategy;

require('./passport')(passport);
//Sperate Processes
var job = require('./Scheduler');
// Controllers

var UserCtrl = require('./dbControllers/UserCtrl');
var DebtsCtrl = require('./dbControllers/DebtsCtrl');

var User = require('./dbModels/User');

// Express
var app = express();

// Middleware 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(session({ secret: 'payback',
   resave: false,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.post('/api/users/:id', UserCtrl.updateUser);

// Passport
function auth(req, res, next){
   if(req.user){
       next();
   }
}

app.post('/api/user/login', passport.authenticate('local-login'), function(req, res){
   User.find({_id: req.user._id})
   .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.post('/api/user/signup', passport.authenticate('local-signup'), function(req, res){
   User.find({_id: req.user._id})
   .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});


app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
});

app.get('/api/user/', function(req, res){
  res.status(200).json(req.user); 
});

app.get('/api/user/:user_id', function(req, res) {
    User.find({_id: req.params.user_id})
    .populate('user')
    .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.get('/auth', auth, function(req, res){
    // res.send(req.user)
    User.find({_id: req.user._id})
    .populate('user')
    .exec().then(function(user) {
        if (!user) {
            return res.status(404).end();
        }
        return res.json(user);
    });
});

app.get('/api/user/auth', function(req, res) {
    user.find({}).exec().then(function(user) {
        return res.json(user);
      });
}); 
// added 8/4 7:00
app.put('/api/users/:id', UserCtrl.updateUser)
// Debts endpoints

app.post('/api/debt/create', DebtsCtrl.createDebt);

app.get('/api/debts', DebtsCtrl.getDebts);

app.put('/api/debts/:id', DebtsCtrl.updateDebt);

// Connections
var port = 1337;
var mongoUri = 'mongodb://localhost:27017/payback';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});

