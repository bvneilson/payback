// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require("fs");
var twilio = require('twilio')('ACf23c70746ca32dfeb5d87f3538ca82ec', '1e6085790b26bfbe34a08c1303b0143f');
var mongojs = require('mongojs');
var db = mongojs('users', ['user']);
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

require('./passport')(passport);

// Controllers
var UserCtrl = require('./dbControllers/UserCtrl');
var DebtsCtrl = require('./dbControllers/DebtsCtrl');

// Express
var app = express();

// Middleware
app.use(express.static(__dirname + '/public'))
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


// Endpoints
app.post('/user', UserCtrl.create);
app.get('/user', UserCtrl.read);
app.put('/user/:id', UserCtrl.update);
app.delete('/user/:id', UserCtrl.delete);

app.post('/debt', DebtsCtrl.create);
app.get('/debt', DebtsCtrl.read);
app.put('/debt/:id', DebtsCtrl.update);
app.delete('/debt/:id', DebtsCtrl.delete);

// Nodemailer post

app.post('/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "robertmcarlson1@gmail.com",
			pass: "tampa157"
		}
	});	
	transporter.sendMail({
	    //from: req.body.from,
	    from: "paybaqq",
	    to: "shrthrdude@yahoo.com",
	    //subject: req.body.subject,
	    subject: "Test from server",
	    //text: req.body.text
	    text: "Test body of text from server"
	}, function(err, info){
		if(err){
			res.status(501).json(err);
		} else {
			res.json(info);
		};
	});
});

// Twilio create new SMS

app.post('/messages', function(req, res){

	var message = {
		//to: req.body.to,
		to: '18632065900',
		from: '12015618832',
		//body: req.body.message,
		body: "Here is the text message",
		date_sent: Date(),
		is_support: true
  	};
  	twilio.sendMessage(message, function(err, data) {
    	if (!err) {
      		return res.status(200).end();
    	}
  	});
});

// Passport
function auth(req, res, next){
   if(req.user){
       next()
   }
}

app.get('/auth', auth, function(req, res){
   // res.send(req.user)
   console.log(req.user)
   User.find({_id: req.user._id})
   .populate('local.goals')
   .exec().then(function(user) {
       if (!user) {
           return res.status(404).end();
       }
       return res.json(user);
   });
})

app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
});

app.post('/api/user/login', passport.authenticate('local-login'), function(req, res){
   res.redirect('/#/dashboard')
})

app.post('/api/user/signup', passport.authenticate('local-signup'), function(req, res){
   res.redirect('/#/dashboard')
})

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