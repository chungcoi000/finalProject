const router = require('express').Router();

router.get('/viewStudentTimeTable', viewStudentTimeTable)
router.post('/createTeacer', createStudentTimeTable)

router.get('/viewUpdateStudentTimeTable/:id', viewUpdateStudentTimeTable)
router.post('/updateStudentTimeTable/:id', updateStudentTimeTable)

router.delete('/deleteStudentTimeTable/:id', deleteStudentTimeTable)

module.exports = router