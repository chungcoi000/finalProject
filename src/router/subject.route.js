const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteSubject, updateSubject, viewSubject, createSubject } = require('../controller/subject.controller')

router.get('/view', auth.checkToken, viewSubject);
router.post('/create', auth.checkToken, createSubject);
router.post('/update/:slug', auth.checkToken, updateSubject);
router.delete('/delete/:slug', auth.checkToken, deleteSubject);

module.exports = router