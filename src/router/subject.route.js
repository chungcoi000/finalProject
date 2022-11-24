const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteSubject, viewSubjects, createSubject, getAllSubjects} = require('../controller/subject.controller')

router.get('/', auth.checkToken, viewSubjects);
router.get('/all', auth.checkToken, getAllSubjects);
router.post('/add', auth.checkToken, createSubject);
router.delete('/delete/:id', auth.checkToken, deleteSubject);

module.exports = router