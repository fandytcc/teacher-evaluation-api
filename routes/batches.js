// routes/batches.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Batch } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/batches', (req, res, next) => {
  console.log('hi')
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
    console.log('hi')
    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .post('/batches', authenticate, (req, res, next) => {
    let newBatch = req.body
    // let newBatch = {
    //   title: req.body.title,
    //   startDate: req.body.startDate,
    //   endDate: req.body.endDate
    // }

    Batch.create(newBatch)
      .then((batch) => {
        debugger
        res.status = 201
        res.json(batch)
      })
      .catch((error) => next(error))
    })

module.exports = router
