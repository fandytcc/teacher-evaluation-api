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

    .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }
      let newStudent = req.body //=payload

      const defaultEvaluation = {
        code: "W",
        remark: "No remarks yet",
        evaluatedAt: new Date(),
      }
      newStudent = { ...newStudent, evaluations: defaultEvaluation }
      newStudent.authorId = req.account._id
      // req.batch.students.push(newStudent)
      const students = req.batch.students.concat(newStudent)
      req.batch.students = students

      req.batch.save()
        .then((batch) => {
          req.batch = batch
          next()
        })
        .catch((error) => next(error))
    },
    // Respond with new student data in JSON
    (req, res, next) => {
      res.json(req.batch)
    })


module.exports = router
