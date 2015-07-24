// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require("fs");

// Controllers
var LibCtrl = require('./dbControllers/LibCtrl');

// Express
var app = express();

// Middleware
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(cors());

// Get config info
 
var config = fs.readFileSync("config.txt", "utf8");

// Endpoints
app.post('/library', LibCtrl.create);
app.get('/library', LibCtrl.read);
app.put('/library/:id', LibCtrl.update);
app.delete('/library/:id', LibCtrl.delete);

app.post('/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "robertmcarlson1@gmail.com",
			pass: config
		}
	});	
	transporter.sendMail({
	    from: req.body.from,
	    to: "shrthrdude@yahoo.com",
	    subject: req.body.subject,
	    text: req.body.text
	}, function(err, info){
		if(err){
			res.status(501).json(err);
		} else {
			res.json(info);
		};
	});
});

// Connections
var port = 2015;
var mongoUri = 'mongodb://localhost:27017/wwh';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});

