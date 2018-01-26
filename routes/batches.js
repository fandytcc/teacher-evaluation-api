// routes/batches.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Batch } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  Batch.find()
    // Newest batches first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((batches) => res.json(batches))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/batches/:batchId', (req, res, next) => {
    const batchId = req.params.id
    Batch.findById(batchId)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .post('/batches', authenticate, (req, res, next) => {
    if (!req.account) {
      const error = new Error('Unauthorized')
      error.status = 401
      return next(error)
    }

    // let newBatch = req.body
    let newBatch = {
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }
    newBatch.authorId = req.account._id

    Batch.create(newBatch)
      .then((batch) => {
        debugger
        res.status = 201
        res.json(batch)
      })
      .catch((error) => next(error))
    })
  .put('/batches/:batchId', authenticate, (req, res, next) => {
    const batchId = req.params.id
    const updatedBatch = req.body

    Batch.findByIdAndUpdate(batchId, { $set: updatedBatch }, { new: true })
      .then((batch) => {
        if (!batch) return next()
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .patch('/batches/:batchId', authenticate, (req, res, next) => {
    const batchId = req.params.id
    const patchForBatch = req.body

    Batch.findById(batchId)
      .then((batch) => {
        if (!batch) return next()

        const updatedBatch = { ...batch, ...patchForBatch }

        Batch.findByIdAndUpdate(batchId, { $set: updatedBatch }, { new: true })
          .then((batch) => res.json(batch))
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })
  .delete('/batches/:batchId', authenticate, (req, res, next) => {
    const batchId = req.params.id

    Batch.findByIdAndRemove(batchId)
      .then((batch) => {
        if (!batch) return next()
          res.json(batch)
      })
      .catch((error) => next(error))
  })

module.exports = router
