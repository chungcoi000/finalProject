const router = require('express').Router();

router.get('/viewStudents', viewStudents)
router.post('/createStudents', createStudents)

router.get('/viewUpdateStudents/:id', viewUpdateStudents)
router.post('/updateStudents/:id', updateStudents)

router.delete('/deleteStudents/:id', deleteStudents)

module.exports = router