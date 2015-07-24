var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  cellPhone: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  messages: { type: String}
});

module.exports = mongoose.model('User', userSchema);