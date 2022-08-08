import * as mongoose from 'mongoose';

export const CountrySchema = new mongoose.Schema({
  id: Number,
  code: String,
  name: String,
  created_at: Object,
  updated_at: Object,
});
