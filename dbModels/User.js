var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  // userName: { type: String, required: true },
  password: { type: String, required: true },
  // cellPhone: { type: String, required: true },
  // address: { type: String },
  // city: { type: String },
  // state: { type: String },
  // zip: { type: String },
  // messages: { type: String}
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);