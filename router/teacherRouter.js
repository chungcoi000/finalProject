const router = require('express').Router();
const { deleteTeacher, updateTeacher, viewUpdateTeacher, createTeacher, viewTeachers } = require('../controller/teacherController')

router.get('/viewTeachers', viewTeachers)
router.post('/createTeacer', createTeacher)

router.get('/viewUpdateTeacher/:slug', viewUpdateTeacher)
router.post('/updateTeacher/:slug', updateTeacher)

router.delete('/deleteTeacher/:slug', deleteTeacher)

module.exports = router