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

// added 8/4 7:00
  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }
};