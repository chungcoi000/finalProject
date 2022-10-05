const router = require('express').Router();
const {
  deleteStudents,
  updateStudent,
  viewStudent,
  createStudents,
  viewStudents
} = require('../controller/student.controller')

router.get('/', viewStudents)
router.post('/add', createStudents)

router.get('/:slug', viewStudent)
router.post('/update/:slug', updateStudent)

router.delete('/delete/:slug', deleteStudents)

module.exports = router