// models/batch.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true, default: 'http://via.placeholder.com/200x200' },
  evaluations: [{
    code: { type: String },
    remark: { type: String },
    evaluatedAt: { type: Date, default: new Date() },
    authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  }],
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

const batchSchema = new Schema({
  title: { type: String, required: true},
  students: [studentSchema],
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() },
  authorId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
})

module.exports = mongoose.model('batches', batchSchema)
