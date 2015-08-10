var User = require('../dbModels/User');
//added 8/4 7:00
var mongoose = require('mongoose');
var AWS = require('aws-sdk');

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
      var s3bucket = new AWS.S3({params: {Bucket: 'debtpayback'}});
      s3bucket.createBucket(function() {
        var params = {Bucket: 'debtpayback', Key: 'myNewKey', Body: 'Hello!'};
        s3bucket.upload(params, function(err, data) {
          if (err) {
            console.log("Error uploading data: ", err);
          } else {
            console.log("Successfully uploaded data to myBucket/myKey");
          }
        });
    });
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }

};