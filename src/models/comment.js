import mongoose, { Schema } from 'mongoose'
import { SCHEMA_NAMES } from '../constants'

const schemaDef = new Schema({
  comment: { type: String },
  addedBy: { type: Schema.ObjectId, ref: SCHEMA_NAMES.USER },
  updatedBy: { type: Schema.ObjectId, ref: SCHEMA_NAMES.USER }
}, { timestamps: true })

export const Comments = mongoose.model(SCHEMA_NAMES.COMMENT, schemaDef)
