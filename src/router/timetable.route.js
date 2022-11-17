const router = require('express').Router();
const auth = require('../middleware/auth')
const {
    createTimeTable,
    timeTableStudent,
    slotStudent,
    timeTableTeacher,
    timeTableTeacherH
} = require('../controller/timetable.controller')


router.post('/create-timetable', auth.checkToken, createTimeTable)
router.get('/student-timetable', auth.checkToken, timeTableStudent)
router.get('/slot-student', auth.checkToken, slotStudent)
router.get('/teacher-timetables', auth.checkToken, timeTableTeacherH)
router.get('/teacher-timetable', auth.checkToken, timeTableTeacher)

module.exports = router