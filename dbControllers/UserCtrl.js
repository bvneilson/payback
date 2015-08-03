var User = require('../dbModels/User');

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
  }
};