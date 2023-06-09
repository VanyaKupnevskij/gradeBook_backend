import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  from: { type: Types.ObjectId, ref: 'User' },
  to: { type: Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  status: { type: String, default: '' },
  comment: { type: String, default: '' },
  mark: { type: Number, default: 0 },
});

export default model('Record', schema);
