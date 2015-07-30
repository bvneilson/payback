// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require("fs");
var twilio = require('twilio')('AC5eec3b646d201f9c91fdf62e2dc40de8', 'e85c28535adf93201b1daf08a04c45cc');
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


app.post('/api/debt/create', DebtsCtrl.createDebt);




// Endpoints
// app.post('/user', UserCtrl.create);
// app.get('/user', UserCtrl.read);
// app.put('/user/:id', UserCtrl.update);
// app.delete('/user/:id', UserCtrl.delete);

// app.post('/debt', DebtsCtrl.create);
// app.get('/debt', DebtsCtrl.read);
// app.put('/debt/:id', DebtsCtrl.update);
// app.delete('/debt/:id', DebtsCtrl.delete);

// Nodemailer post

app.post('/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "robertmcarlson1@gmail.com",
			pass: ""
		}
	});	
	transporter.sendMail({
	    //from: req.body.from,
	    from: "paybaqq",
	    to: req.body.to,
	    //to: "shrthrdude@yahoo.com",
	    subject: req.body.subject,
	    //subject: "Test from server",
	    text: req.body.text
	    //text: "Test body of text from server"
	}, function(err, info){
		if(err){
			res.status(501).json(err);
		} else {
			res.json(info);
		}
	});
});

// Twilio create new SMS

app.post('/messages', function(req, res){

	var message = {

		to: req.body.to,
		from: '14088377896',
		body: req.body.message,
		date_sent: Date(),
		is_support: true
  	};
  	twilio.sendMessage(message, function(err, data) {
    	if (!err) {
      		return res.status(200).end();
    	}
  	});
});




// app.get('/auth', auth, function(req, res){
//    // res.send(req.user)
//    User.find({_id: req.user._id})
//    .populate('local.goals')
//    .exec().then(function(user) {
//        if (!user) {
//            return res.status(404).end();
//        }
//        return res.json(user);
//    });
// })


//debt endpoints



// Connections
var port = 1337;
var mongoUri = 'mongodb://localhost:27017/payback';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});


app.get('/api/user/', function(req, res){
  console.log("server ", req.user)
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
	console.log(req.user);
    user.find({}).exec().then(function(user) {
        return res.json(user);
      });
}); 

app.listen(port, function() {
  console.log('Listening on port ', port);
});

