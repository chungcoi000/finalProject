const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteSubject, updateSubject, viewSubjects, createSubject, getAllSubjects} = require('../controller/subject.controller')

router.get('/', auth.checkToken, viewSubjects);
router.get('/all', auth.checkToken, getAllSubjects);
router.post('/add', auth.checkToken, createSubject);
router.post('/update/:slug', auth.checkToken, updateSubject);
router.delete('/delete/:slug', auth.checkToken, deleteSubject);

module.exports = router