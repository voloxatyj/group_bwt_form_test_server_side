import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  firstname: String,
  lastname: String,
  birthdate: String,
  report_subject: String,
  phone: String,
  email: { type: String, unique: true },
  country_id: Number,
  about: String,
  company: String,
  position: String,
  photo_url: String,
  photo_hash: String,
  photo_ext: String,
  photo: String,
  created_at: Date,
  deleted_at: Date,
  updated_at: Date,
});
