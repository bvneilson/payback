var mongoose = require('mongoose');

var debtsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  cellPhone: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);