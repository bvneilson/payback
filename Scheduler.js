//Scheduler.js
var Debt = require('./dbModels/Debts');
var CronJob = require('cron').CronJob;
var dotenv = require('dotenv');
dotenv.load();

var job = new CronJob('0 12 * * * 1',  email, null, true, 'America/Phoenix'); job.start();

function email() { 
  // Grab all unpaid debt
  console.log(232323, Debt.where({ status: 'Open'}));
  // For each user with unpaid debt
    // Grab user template
    // Pass debt information to user template and store string
    // Use returned string and schedule email using sendgrid
 }

//Sendgrid
var sendgrid_api_key = process.env.SENDGRID_API_KEY;
var sendgrid = require('sendgrid')(sendgrid_api_key);
var sendGridEmail = new sendgrid.Email({
  to:       ['braxton.christensen@gmail.com'],
  from:     'info@debtpayback.com',
  subject:  'Sendgrid winning',
  text:     'Hello world',
  setSendEachAt: [
  Math.floor(Date.now() / 1000)
  ]
});
// sendgrid.send(sendGridEmail , function(err, json) {
//   if (err) { return console.error(err); }
//   console.log(json);
// });