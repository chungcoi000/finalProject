const router = require('express').Router();

router.get('/viewTeachers', viewTeachers)
router.post('/createTeacer', createTeacher)

router.get('/viewUpdateTeacher/:id', viewUpdateTeacher)
router.post('/updateTeacher/:id', updateTeacher)

router.delete('/deleteTeacher/:id', deleteTeacher)

module.exports = router