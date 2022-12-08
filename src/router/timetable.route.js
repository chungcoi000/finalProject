const router = require('express').Router();
const auth = require('../middleware/auth')
const {
  createTimeTable,
  timeTableTeacher,
  timeTableClass
} = require('../controller/timetable.controller')

router.get('/:id', auth.checkToken, timeTableClass)
router.post('/add', auth.checkToken, createTimeTable)
router.get('/get/teacher-timetable', auth.checkToken, timeTableTeacher)

module.exports = router