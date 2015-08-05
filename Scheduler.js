//Scheduler.js
var Debt = require('./dbModels/Debts');
var CronJob = require('cron').CronJob;
var dotenv = require('dotenv');
dotenv.load();

var job = new CronJob('0 12 * * 2,5',  email, null, true, 'America/Denver'); job.start();
function email() { 
  	// Grab all unpaid debt
  	Debt.where({ status: 'Open'}).exec().then(function(result){
  		// For each user with unpaid debt(or open debt).
  		for(var item in result) {
  		    // Pass debt information to template and store string.
  			var emailText = 'Just a reminder, '+result[item].fullname+' you owe me $'
  							+result[item].amount+' for '+result[item].newdescription;
  			//Sendgrid
  		    // Use returned string and schedule email using sendgrid.
			var sendgrid_api_key = process.env.SENDGRID_API_KEY;
			var sendgrid = require('sendgrid')(sendgrid_api_key);
			var sendGridEmail = new sendgrid.Email({
			  to:       result[item].email,
			  from:     'info@debtpayback.com',
			  subject:  'Just a reminder.',
			  text:     emailText,
			  setSendEachAt: [
			  Math.floor(Date.now() / 1000)
			  ]
			});
			sendgrid.send(sendGridEmail , function(err, json) {
			  if (err) { return console.error(err); }
			  console.log(json);
			});
  		}
  	});
 }