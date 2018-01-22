// models/batch.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  remark: { type: String },
  codes: [{ type: String }],
  evaluated: { type: Boolean, default: false },
  evaluatedAt: { type: Date, default: Date.now },
  evaluatedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const batchSchema = new Schema({
  students: [studentSchema],
  started: { type: Boolean, default: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('batches', batchSchema)
