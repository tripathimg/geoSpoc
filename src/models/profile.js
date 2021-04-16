import mongoose, { Schema } from 'mongoose'
import { SCHEMA_NAMES } from '../constants'

const schemaDef = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, unique: 1 },
  cover: { type: String, required: true },
  web: { type: String },
  attachments: { type: String },
  work: Boolean
}, { timestamps: true })

export const Profiles = mongoose.model(SCHEMA_NAMES.PROFILE, schemaDef)
