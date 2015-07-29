var Debt = require('../dbModels/Debts');

module.exports = {
  create: function(req, res) {
    var newDebt = new Debt(req.body);
    newDebt.save(function(err, newDebt) {
      if (err) { 
      return res.status(500).end();
    }
    else {
      res.status(200).json(newDebt);
    }
    });
  },

  // read: function(req, res) {
  //   Debt
  //   .find(req.query)
  //   .populate('user')
  //   .exec(function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // },

  // update: function(req, res) {
  //   Debt.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // },

  // delete: function(req, res) {
  //   Debt.findByIdAndRemove(req.params.id, function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // }
};