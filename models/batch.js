// models/batch.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  code: { type: String, required: true },
  remark: { type: String, required: false },
  evaluatedAt: { type: Date, default: Date.now },
  evaluatedBy: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true, default: 'http://via.placeholder.com/500x180?text=No%20Image' },
  evaluations: [evaluationSchema],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const batchSchema = new Schema({
  title: { type: String, required: true},
  students: [studentSchema],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('batches', batchSchema)
