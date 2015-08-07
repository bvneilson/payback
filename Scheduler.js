//Scheduler.js
var User = require('./dbModels/User');
var Debt = require('./dbModels/Debts');
var CronJob = require('cron').CronJob;
var dotenv = require('dotenv');
dotenv.load();
var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// var job = new CronJob('0 12 * * 2,5',  email, null, true, 'America/Denver'); job.start();
email()
function email() { 
  	// Grab all unpaid debt.
  	Debt.where({ status: 'Open'}).exec().then(function(debt){
  		// For each user with unpaid debt(or open debt).
  		for(var item in debt) {
  		    // Pass debt information to template and store string.
  			var emailText = 'Just a reminder, '+debt[item].fullname+'. You owe me $'
  							+debt[item].amount+' for '+debt[item].newdescription+'. '+debt[item].message;
  			//Sendgrid
  		    // Use returned string and schedule email using sendgrid
			var sendGridEmail = new sendgrid.Email({
			  to:       debt[item].email,
			  from:     'info@debtpayback.com',
			  subject:  'Just a reminder.',
			  text:     emailText,
			  setSendEachAt: Math.floor(Date.now() / 1000)
			});
			//send off email with sendgrid
			sendgrid.send(sendGridEmail , function(err, json) {
			  if (err) { console.error(err); }
			  debt[item].sendRecord = new Date().toString();
			  debt[item].save(function(err){ });
			  console.log(debt[item].sendRecord);
			  console.log(json);
			});
  		}
  	});
 }
text();
function text() {
//grab all unpaid debt(open debt)
	Debt.where({status: 'Open'}).exec().then(function(debt){
 		//for each user with open debt
 		for(var item in debt) {
 			//store text into a string
  			var text = 'Just a reminder, '+debt[item].fullname+'. You owe me $'
  							+debt[item].amount+' for '+debt[item].newdescription+'. '+debt[item].message;
 			//Twilio
 			//Use text String and schedule text using twilio
 			var message = {
 				to: debt[item].cellPhone,
 				from: '14088377896',
 				body: text,
 				date_sent: Date(),
 				is_support: true
 			};
 			//send off text with twilio
 			twilio.sendMessage(message, function(err, json) {
 				if (err) { console.log(err); }
 			});
 		}
 	});
}

