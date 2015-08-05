var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  debtId: [ {type:mongoose.Schema.Types.ObjectId, ref: 'Debt', required: true} ],
  firstName: { type: String },
  lastName: { tpe: String },
  cellPhone: { type: String }
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