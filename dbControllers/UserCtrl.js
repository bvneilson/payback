var User = require('../dbModels/User');

module.exports = {
  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save( function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  },

  read: function(req, res) {
    User
    .find(req.query)
    .populate('user')
    .exec(function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  },

  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }
};