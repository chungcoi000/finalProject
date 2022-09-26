const router = require('express').Router();

router.get('/viewteacherTimeTable', viewteacherTimeTable)
router.post('/createTeacer', createteacherTimeTable)

router.get('/viewUpdateteacherTimeTable/:id', viewUpdateteacherTimeTable)
router.post('/updateteacherTimeTable/:id', updateteacherTimeTable)

router.delete('/deleteteacherTimeTable/:id', deleteteacherTimeTable)

module.exports = router