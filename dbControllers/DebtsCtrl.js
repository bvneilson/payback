var Debt = require('../dbModels/Debts.js');
var User = require('../dbModels/User.js');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();
var sendgrid = require('sendgrid')('apikey', 'WlSFGak6Qxm_AQcDYBi9ug');
var scheduler = require('../Scheduler.js');

module.exports = {

  createDebt: function(req, res){
    Debt.create({
      email: req.body.email, 
      fullname: req.body.fullname, 
      amount: req.body.amount, 
      cellPhone: req.body.cellPhone,
      newdescription: req.body.newdescription,
      message: req.body.message,
      schedulePref: req.body.schedulePref,
      userId: req.user._id,
      sendRecord: Math.floor(Date.now()/1000)
    },
     function(err, debt){
      if(debt){
        User
          .findByIdAndUpdate(req.user.id, 
            {$push: {debtId: debt._id}},
            function(err, debt){
              return res.json(debt);
              if(err) return res.status(500).end(); 
              return res.json(debt); 
            });
      }
      // if(err) return res.status(500).end(); 
      // return res.json(debt); 
    });
    scheduler.emailOnCreate(req.body.email, req.user.id, req.body.fullname, req.body.cellPhone);
  },

  getDebts: function(req, res) {
    Debt.find({}, function(err, result) {
      if(err) {
        return res.status(500).end();
      }
      return res.json(result);
    });
  },
 
  // updateDebt: function(req, res) {
  //   Debt.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // }

  updateDebt: function(req, res){
    Debt
      .findByIdAndUpdate(req.params.id, {
        email: req.body.email, 
        fullname: req.body.fullname, 
        amount: req.body.amount, 
        cellPhone: req.body.cellPhone,
        newdescription: req.body.newdescription,
        message: req.body.message,
        schedulePref: req.body.schedulePref,
        discount: req.body.discount,
        discountedAmount: req.body.discountedAmount,
        increasedAmount: req.body.increasedAmount,
        interest: req.body.interest
        // userId: req.user.id
        // sendRecord: Math.floor(Date.now()/1000)
      })
      .exec(function(err, result){
        console.log("debt updated", result); 
        if(err) return res.status(500).end(); 
        return res.status(200).json(result); 
      })
  }

  // delete: function(req, res) {
  //   Debt.findByIdAndRemove(req.params.id, function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // }
};
