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
  Promise.all(req.batch.students.map(student => Batch.students.findById(student._id)))
    .then((students) => {
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
      if (!req.batch || !req.students) { return next() }
      res.json(req.students)
    })

    .get('batches/:id/students/:studentId', loadBatch, (req, res, next) => {
      if (!req.batch || !req.students) { return next() }
      const studentId = req.students.params.id

      Batch.students.findById(studentId)
        .then((student) => {
          if (!student) { return next() }
          res.json(student)
        })
        .catch((error) => next(error))
    })

    .post('/batches/:id/students/:studentId', authenticate, loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }

      const studentId = req.students.params.id

      let newStudent = {
        name: req.body.name,
        photo: req.body.photo,
      }
      newBatch.authorId = req.account._id

      req.student.save()
        .then((batch) => {
          req.student = batch
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

      const studentId = req.students.params.id
      const student = req.students.filter((s) => s._id.toString() === studentId.toString())[0]

      req.students = req.students.filter((s) => s._id.toString() !== studentId.toString())
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
