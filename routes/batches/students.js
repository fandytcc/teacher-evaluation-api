// routes/batches/students.js
const router = require('express').Router()
const passport = require('../../config/auth')
const { Student, Batch } = require('../../models')

const authenticate = passport.authorize('jwt', { session: false })

const loadBatch = (req, res, next) => {
  const id = req.params.id

  Batch.findById(id)
    .then((batch) => {
      req.batch = batch
      next()
    })
    .catch((error) => next(error))
}

// const getStudents = (req, res, next) => {
//   Promise.all(req.batch.students.map(student => User.findById(student._Id)))
//     .then((users) => {
//       // Combine student data and user's name
//       req.students = req.batch.students.map((student) => {
//         const { name } = users
//           .filter((u) => u._id.toString() === student.userId.toString())[0]
//
//         return {
//           userId: student.userId,
//           pairs: student.pairs,
//           name
//         }
//       })
//       next()
//     })
//     .catch((error) => next(error))
// }

router.get('/batches/:id/students', loadBatch (req, res, next) => {
      if (!req.batch || !req.students) { return next() }
      res.json(req.students)
    })

    // .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
    //   if (!req.batch) { return next() }
    //
    //   const userId = req.account._id
    //
    //   if (req.batch.students.filter((p) => p.userId.toString() === userId.toString()).length > 0) {
    //     const error = Error.new('You already joined this batch!')
    //     error.status = 401
    //     return next(error)
    //   }
    //
    //   // Add the user to the students
    //   req.batch.students.push({ userId, pairs: [] })
    //
    //   req.batch.save()
    //     .then((batch) => {
    //       req.batch = batch
    //       next()
    //     })
    //     .catch((error) => next(error))
    // },
    // // Fetch new student data
    // getstudents,
    // // Respond with new student data in JSON
    // (req, res, next) => {
    //   res.json(req.students)
    // })
    //
    // .delete('/batches/:id/students', authenticate, (req, res, next) => {
    //   if (!req.batch) { return next() }
    //
    //   const userId = req.account._id
    //   const currentstudent = req.batch.students.filter((p) => p.userId.toString() === userId.toString())[0]
    //
    //   if (!currentstudent) {
    //     const error = Error.new('You are not a student of this batch!')
    //     error.status = 401
    //     return next(error)
    //   }
    //
    //   req.batch.students = req.batch.students.filter((p) => p.userId.toString() !== userId.toString())
    //   req.batch.save()
    //     .then((batch) => {
    //       req.batch = batch
    //       next()
    //     })
    //     .catch((error) => next(error))
    //
    // },
    // // Fetch new student data
    // getstudents,
    // // Respond with new student data in JSON
    // (req, res, next) => {
    //   res.json(req.students)
    // })

module.exports = router
