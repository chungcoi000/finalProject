const router = require('express').Router();
const auth = require('../middleware/auth')
const { deleteClass, getClass, upClass, getClasses, addClass, updateClass, getClassByUnit } = require('../controller/class.controller')



router.get('/', auth.checkToken, getClasses);
router.post('/add', auth.checkToken, addClass);
router.post('/upClass', auth.checkToken, upClass);
router.get('/:slug', auth.checkToken, getClass);
router.post('/update/:slug', auth.checkToken, updateClass);
router.post('/getCLassByUnit/name', auth.checkToken, getClassByUnit)
router.delete('/delete/:slug', auth.checkToken, deleteClass);

module.exports = router