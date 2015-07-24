var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  book: { type: String, required: true },
  author: { type: String },
  ISBN: { type: String },
  summary: { type: String },
  reserve: { type: Boolean },
  chkName: { type: String },
  chkEmail: { type: String },
  chkCheckout: { type: Boolean }
});

module.exports = mongoose.model('Book', bookSchema);