const router = require('express').Router();
const auth = require('../middleware/auth')
const {
    createTimeTable,
    timeTableStudent,
    timeTableTeacher,
    timeTableTeacherH
} = require('../controller/timetable.controller')

router.post('/create-timetable', auth.checkToken, createTimeTable)
router.get('/student-timetable', auth.checkToken, timeTableStudent)
router.get('/form-teacher-timetable', auth.checkToken, timeTableTeacherH)
router.get('/teacher-timetable', auth.checkToken, timeTableTeacher)

module.exports = router