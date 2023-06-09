const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  from: { type: Types.ObjectId, ref: 'User' },
  to: { type: Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  status: { type: String, default: '' },
  comment: { type: String, default: '' },
  mark: { type: Number, default: 0 },
});

module.exports = model('Record', schema);
