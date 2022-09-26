const router = require('express').Router();
const { deleteStudentTimeTable, updateStudentTimeTable, viewUpdateStudentTimeTable, createStudentTimeTable, viewStudentTimeTable } = require('../controller/studentTimeTableController')

router.get('/viewStudentTimeTable', viewStudentTimeTable)
router.post('/createTeacer', createStudentTimeTable)

router.get('/viewUpdateStudentTimeTable/:slug', viewUpdateStudentTimeTable)
router.post('/updateStudentTimeTable/:slug', updateStudentTimeTable)

router.delete('/deleteStudentTimeTable/:slug', deleteStudentTimeTable)

module.exports = router