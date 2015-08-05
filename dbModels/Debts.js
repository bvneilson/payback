var mongoose = require('mongoose');

var debtsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  amount: { type: Number, required: true },
  cellPhone: { type: String, required: true },
  newdescription: { type: String, required: true },
  message: {type: String},
  userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  status: {type: String, default: "Open", required: true}
});

module.exports = mongoose.model('Debt', debtsSchema);