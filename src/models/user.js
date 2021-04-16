import mongoose, { Schema } from 'mongoose'
import { SCHEMA_NAMES } from '../constants'

const schemaDef = new Schema({
  firstname: { type: String, required: true, maxlength: 100 },
  lastname: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, unique: 1 },
  password: { type: String, required: true, minlength: 8 }
}, { timestamps: true })

export const Users = mongoose.model(SCHEMA_NAMES.USER, schemaDef)
