const router = require('express').Router();
const { deleteteacherTimeTable, updateteacherTimeTable, viewUpdateteacherTimeTable, createteacherTimeTable, viewteacherTimeTable } = require('../controller/teacherTimeTableController')

router.get('/viewteacherTimeTable', viewteacherTimeTable)
router.post('/createTeacer', createteacherTimeTable)

router.get('/viewUpdateteacherTimeTable/:slug', viewUpdateteacherTimeTable)
router.post('/updateteacherTimeTable/:slug', updateteacherTimeTable)

router.delete('/deleteteacherTimeTable/:slug', deleteteacherTimeTable)

module.exports = router