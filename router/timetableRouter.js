const router = require('express').Router();
const { createTimeTable, timeTableStudent, slotStudent, timeTableTeacherH, timeTableTeacher } = require('../controller/timeTableController')


router.post('/createTimeTable', createTimeTable)
router.get('/timeTableStudent', timeTableStudent)
router.get('/slotStudent', slotStudent)
router.get('/timeTableTeacherH', timeTableTeacherH)
router.get('/timeTableTeacher', timeTableTeacher)

module.exports = router