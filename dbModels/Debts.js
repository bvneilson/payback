var mongoose = require('mongoose');

var debtsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  amount: { type: Number, required: true },
  cellPhone: { type: String, required: true },
  newdescription: { type: String, required: true },
  message: {type: String},
  schedulePref: {type: Number},
  userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  status: {type: String, default: "Open", required: true},
  sendRecord: {type: Number},
  discount: { type: Boolean, default: false },
  discountedAmount: { type: Number, default: 0 },
  increasedAmount: { type: Number, default: 0 },
  interest: { type: Boolean, default: false }
});

module.exports = mongoose.model('Debt', debtsSchema);