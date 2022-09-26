const router = require('express').Router();
const { deleteStudents, updateStudents, viewUpdateStudents, createStudents, viewStudents } = require('../controller/studentController')

router.get('/viewStudents', viewStudents)
router.post('/createStudents', createStudents)

router.get('/viewUpdateStudents/:slug', viewUpdateStudents)
router.post('/updateStudents/:slug', updateStudents)

router.delete('/deleteStudents/:slug', deleteStudents)

module.exports = router