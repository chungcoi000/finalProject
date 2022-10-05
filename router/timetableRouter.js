const router = require('express').Router();
const { createTimeTable, timeTableStudent, slotStudent, timeTableTeacher, timeTableTeacherH } = require('../controller/timeTableController')


router.post('/create-timetable', createTimeTable)
router.get('/student-timetable', timeTableStudent)
router.get('/slot-student', slotStudent)
router.get('/teacher-timetables', timeTableTeacherH)
router.get('/teacher-timetable', timeTableTeacher)

module.exports = router