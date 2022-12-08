const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteClass, getClass, getClasses, addClass, updateClass, getClassByUnit, updateStudentToClass, getUserClass} = require('../controller/class.controller')

router.get('/', auth.checkToken, getClasses);
router.get('/getClass', auth.checkToken, getUserClass);
router.post('/add', auth.checkToken, addClass);
router.get('/:id', auth.checkToken, getClass);
router.post('/update/:id', auth.checkToken, updateClass);
router.get('/getClassByUnit', auth.checkToken, getClassByUnit);
router.delete('/delete/:id', auth.checkToken, deleteClass);
router.post('/updateStudent', auth.checkToken, updateStudentToClass);

module.exports = router