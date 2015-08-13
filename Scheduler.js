//Scheduler.js
var User = require('./dbModels/User');
var Debt = require('./dbModels/Debts');
var CronJob = require('cron').CronJob;
var dotenv = require('dotenv');
dotenv.load();
var sendgrid = require('sendgrid')('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');
var twilio = require('twilio')('AC5eec3b646d201f9c91fdf62e2dc40de8', 'e85c28535adf93201b1daf08a04c45cc');

var job = new CronJob('0 10 * * *',  email, null, true, 'America/Denver'); job.start();
// email();
function email() { 
	var owner;
	var now = Date.now()/1000;
  	// Grab all unpaid debt.
  	Debt.where({ status: 'Open'}).exec().then(function(debt){
  		// For each user with unpaid debt(or open debt).
  		for(var item in debt) { 
  			var userid = debt[item].userId.toString();
			User
			.findById(userid, function(err, user){
				if(err) console.log(err);
				console.log(user.firstName);
				undefined = user.email;
				owner = user.firstName;
			}).exec().then(function(){
			console.log(owner);

  		    // Pass debt information to template and store string.
  			var emailText = 'Just a reminder, '+debt[item].fullname+'. You owe '+owner+' $'
  							+debt[item].amount+' for '+debt[item].newdescription+'. '+debt[item].message;
  			//Twilio Setup
  			var message = {
  				to: debt[item].cellPhone,
 				from: '14088377896',
 				body: emailText,
 				date_sent: Date(),
 				is_support: true
 			};
  			//Sendgrid
  		    // Use returned string and schedule email using sendgrid
			var sendGridEmail = new sendgrid.Email({
			  to:       debt[item].email,
			  from:     'info@debtpayback.com',
			  subject:  'Just a reminder.',
			  text:     emailText,
			  setSendEachAt: Math.floor(now)
			});
			//send off email with sendgrid
			if(debt[item].schedulePref <= debt[item].sendRecord){
				twilio.sendMessage(message, function(err, json) {
 					if (err) { console.log(err); }
 				});
				sendgrid.send(sendGridEmail , function(err, json) {
				  debt[item].sendRecord = Math.floor(now);
				  debt[item].schedulePref = (debt[item].schedulePref+debt[item].sendRecord);
				  debt[item].save(function(err){ });
				  console.log('sendRecord'+debt[item].sendRecord);
				  console.log(json);
				  if (err) { console.error(err); }
				});
			}
		});
  		}
  	});
 }

 function emailOnCreate(email, debtHolderId, debterName, cellPhone) {
 	var debtOwner;
	var userid = debtHolderId.toString();
		User
		.findById(userid, function(err, user){
			if(err) console.log(err);
			console.log(user.firstName);
			if (user.firstName === ""){
				debtOwner = user.firstName;
			} else {
				debtOwner = user.email;
			}
			
		}).exec().then(function(){
		console.log(debtOwner);
	var messageToBeSent = debtOwner+' has declared an outstanding debt aginst you, '+debterName+', on debtpayback.com';
	//Twilio Setup
	var message = {
		to: cellPhone,
		from: '14088377896',
		body: messageToBeSent,
		date_sent: Date(),
		is_support: true
	};
	//SendGrid setup
 	var sendGridEmail = new sendgrid.Email({
			  to:       email,
			  from:     'info@debtpayback.com',
			  subject:  'You owe me money!',
			  text:     messageToBeSent,
			  setSendEachAt: Math.floor(Date.now()/1000)
	});
	//send with twlio
	twilio.sendMessage(message, function(err, json) {
		if (err) { console.log(err); }
	});
	//send with sendgrid
	sendgrid.send(sendGridEmail, function(err, json){
		if(err) console.error(err); 
		console.log(json); 
	}); 
    });
 }

module.exports.emailOnCreate = emailOnCreate;
