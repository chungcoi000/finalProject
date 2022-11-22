const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteClass, getClass, getClasses, addClass, updateClass, getClassByUnit } = require('../controller/class.controller')

router.get('/', auth.checkToken, getClasses);
router.post('/add', auth.checkToken, addClass);
router.get('/:slug', auth.checkToken, getClass);
router.post('/update/:id', auth.checkToken, updateClass);
router.get('/getClassByUnit', auth.checkToken, getClassByUnit)
router.delete('/delete/:id', auth.checkToken, deleteClass);

module.exports = router