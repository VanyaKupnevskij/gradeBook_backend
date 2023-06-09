import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  name_subject: { type: String },
  students: [{ type: String }],
});

export default model('User', schema);
