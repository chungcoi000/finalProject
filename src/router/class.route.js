const router = require('express').Router();
const { deleteClass, getClass, upClass, getClasses, addClass, updateClass } = require('../controller/class.controller')

router.get('/', getClasses);
router.post('/add', addClass);
router.post('/upClass', upClass);
router.get('/:slug', getClass);
router.post('/update/:slug', updateClass);
router.delete('/delete/:slug', deleteClass);

module.exports = router