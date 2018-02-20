// routes/batches.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Batch } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  // console.log('hi')
  Batch.find()
    // Newest batches first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((batches) => res.json(batches))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/batches/:batchId', (req, res, next) => {
    const id = req.params.batchId
    // console.log('hi')
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .post('/batches', authenticate, (req, res, next) => {
    let newBatch = req.body //=payload

    Batch.create(newBatch)
      .then((batch) => {
        res.status = 201
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .put('/batches/:batchId', (req, res, next) => {
    const id = req.params.batchId
    let batchUpdates = req.body

    Batch.findOneAndUpdate(id, batchUpdates)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .patch('/batches/:batchId', (req, res, next) => {
    const id = req.params.batchId
    let batchUpdates = req.body

    // { $set: { student: studentUpdates } }
    Batch.findOneAndUpdate(id, batchUpdates)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .delete('/batches/:batchId', (req, res, next) => {
    const id = req.params.batchId

    Batch.findOneAndRemove(id)
      .then((batch) => {
        if(!batch) return next()
        res.json(batch)
      })
      .catch((error) => next(error))
  })

module.exports = router
