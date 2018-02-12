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

const getStudents = (req, res, next) => {
  Promise.all(req.batch.students.map(student => Batch.students.findById(student.id)))
    .then((student) => {
        return {
          name: student.name,
          photo: student.photo,
          evaluations: student.evaulation
        }
        next()
    })
    .catch((error) => next(error))
}

router
    .get('/batches/:id/students', loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }
      res.json(req.students)
    })

    .get('/batches/:id/students/:studentId', loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }
      const studentId = req.params.studentId

      const student = req.batch.students.filter(student => {
        return (student._id.toString() === studentId.toString())
      })[0]

      res.json(student)
    })

    .post('/batches/:id/students/:studentId', authenticate, loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }
      const studentId = req.params.studentId

      let newStudent = {
        name: req.body.name,
        photo: req.body.photo,
      }

      newStudent.authorId = req.account._id

      req.student.save()
        .then((student) => {
          req.student = student
          next()
        })
        .catch((error) => next(error))
    },
    // Fetch new student data
    getStudents,
    // Respond with new student data in JSON
    (req, res, next) => {
      res.json(req.students)
    })

    .delete('/batches/:id/students/:studentId', authenticate, loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }

      const studentId = req.params.studentId
      const student = req.batch.students.filter(student => {
        return (student._id.toString() === studentId.toString())
      })[0]

      req.students = req.batch.students.filter(student => student._id.toString() !== studentId.toString())

      req.student.save()
        .then((student) => {
          req.student = student
          next()
        })
        .catch((error) => next(error))
    },
    // Fetch new student data
    getStudents,
    // Respond with new student data in JSON
    (req, res, next) => {
      res.json(req.students)
    })

module.exports = router
