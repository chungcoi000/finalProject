const router = require('express').Router();
const {deleteTeacher, updateTeacher, getTeacher, addTeacher, getTeachers} = require('../controller/teacher.controller')

router.get('/', getTeachers)
router.post('/add', addTeacher)
router.get('/:slug', getTeacher)
router.post('/update/:slug', updateTeacher)
router.delete('/delete/:slug', deleteTeacher)

module.exports = router