var User = require('../dbModels/User');
//added 8/4 7:00
var mongoose = require('mongoose');

module.exports = {
 create: function(req, res) {
   var newUser = new User(req.body);
   newUser.save( function(err, result) {
     if (err) return res.status(500).json(err);
     res.json(result);
   });
 },

 dashboard: function(req, res) {
   user.find({}).exec().then(function(user) {

       return res.json(user);
     });
 },
 
 updateUser: function(req, res) {
   User.findByIdAndUpdate(req.params.id, {
      email: { type: String, required: true },
      password: { type: String, required: true },
      firstName: { type: String },
      lastName: { tpe: String },
      cellPhone: { type: String },
      paypalEmail: { type: String }
    })
      .exec(function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
 }

};